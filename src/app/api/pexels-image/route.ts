import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page: string;
}

// Cache for storing image URLs
const cache = new Map<string, { url: string; photographer: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const size = searchParams.get('size') || 'large';
  
  if (!destination) {
    return NextResponse.json({ error: 'Destination parameter is required' }, { status: 400 });
  }

  const cacheKey = `${destination}-${size}`;
  
  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return NextResponse.json({
      url: cached.url,
      photographer: cached.photographer,
      cached: true
    });
  }

  try {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Pexels API key not configured' }, { status: 500 });
    }

    // Create search query with destination-related keywords
    const searchTerms = [
      `${destination} cityscape`,
      `${destination} landmarks`,
      `${destination} architecture`,
      `${destination} skyline`,
      `${destination} travel`
    ];

    let photos: PexelsPhoto[] = [];
    
    // Try different search terms until we find results
    for (const term of searchTerms) {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=10&orientation=landscape`,
        {
          headers: {
            'Authorization': apiKey,
          },
        }
      );

      if (!response.ok) {
        console.error(`Pexels API error: ${response.status}`);
        continue;
      }

      const data: PexelsResponse = await response.json();
      if (data.photos && data.photos.length > 0) {
        photos = data.photos;
        break;
      }
    }

    if (photos.length === 0) {
      // Fallback to a generic travel/city image
      const fallbackResponse = await fetch(
        `https://api.pexels.com/v1/search?query=beautiful city skyline&per_page=10&orientation=landscape`,
        {
          headers: {
            'Authorization': apiKey,
          },
        }
      );

      if (fallbackResponse.ok) {
        const fallbackData: PexelsResponse = await fallbackResponse.json();
        photos = fallbackData.photos || [];
      }
    }

    if (photos.length === 0) {
      return NextResponse.json({ error: 'No images found' }, { status: 404 });
    }

    // Select a random photo from the results
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    
    // Get the requested size URL
    const imageUrl = randomPhoto.src[size as keyof typeof randomPhoto.src] || randomPhoto.src.large;
    
    // Cache the result
    cache.set(cacheKey, {
      url: imageUrl,
      photographer: randomPhoto.photographer,
      timestamp: Date.now()
    });

    return NextResponse.json({
      url: imageUrl,
      photographer: randomPhoto.photographer,
      photographer_url: randomPhoto.photographer_url,
      alt: randomPhoto.alt || `${destination} cityscape`,
      cached: false
    });

  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}