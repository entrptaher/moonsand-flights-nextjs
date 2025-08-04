# Flight Booking Website - Berlin Flights

## Project Overview
Building a complete replica of a flight booking website focused on Berlin flights using Next.js with Server-Side Rendering (SSR) and Bun.

## Technology Stack
- **Runtime**: Bun
- **Framework**: Next.js (SSR focused)
- **Styling**: TailwindCSS (assumed, needs confirmation)
- **Database**: TBD (needs API details)

## Detailed Section Breakdown

### 1. Header Section - Flight Search Form
**Background**: Gradient blue sky with white clouds
**Container**: White rounded search box, centered, with shadow

**Main Search Form Structure**:
- **Title**: "Find cheap flights to Berlin (BER)" - large, dark blue/black text, centered
- **Form Layout**: Single row with 5 input fields + search button
  
**Form Fields (left to right)**:
1. **From Field**:
   - Label: "From" (small gray text above)
   - Placeholder: City/airport name
   - Icon: Small airplane departure icon (left side)
   
2. **To Field**:
   - Label: "To" (small gray text above)
   - Value: "Berlin (BER)" - pre-filled, bold text
   - Icon: Small airplane arrival icon (left side)
   
3. **Depart Field**:
   - Label: "Depart" (small gray text above)
   - Calendar icon (left side)
   - Date format display
   
4. **Return Field**:
   - Label: "Return" (small gray text above)
   - Calendar icon (left side)
   - Date format display
   
5. **Passengers Field**:
   - Label: "Passengers" (small gray text above)
   - Person icon (left side)
   - Dropdown arrow (right side)
   - Default: "1 passenger"

6. **Search Button**:
   - Text: "Search" or "Find flights"
   - Color: Blue/purple gradient background
   - White text, bold
   - Rounded corners
   - Full height of form fields

**Alert Banner Below**:
- Orange/yellow background color
- Warning/info icon (left side)
- Message text about COVID-19 or travel restrictions
- Close button (X) on right side
- Full width of search container

### 2. Direct Flights Promotion Section
**Background**: Light gray/off-white
**Container**: Full width, white background section

**Layout**: Two-column grid layout
**Left Column (60% width)**:
- **Main Heading**: "Browse direct flights to Berlin (BER)" - large, bold, dark text
- **Subheading**: "Search and compare direct flights from hundreds of airlines and online agencies" - medium gray text, smaller font
- **Features List**: Bullet points about direct flight benefits
- **CTA Button**: "Find deals" - same blue gradient as search button

**Right Column (40% width)**:
- **Illustration**: Cartoon-style airplane seats (2 seats side by side)
- **Promotional Text Overlay**: "Get the best deals on airline tickets"
- **Secondary CTA**: Another "Find deals" button below illustration

**Visual Elements**:
- Clean, modern layout with ample white space
- Consistent button styling throughout
- Professional airline industry imagery

### 3. Airline Partners Bar
**Background**: White
**Layout**: Horizontal scrolling row of airline logos

**Airlines Displayed** (left to right):
1. Lufthansa (crane logo)
2. British Airways (flag design)
3. KLM (crown logo)
4. Turkish Airlines (bird logo)
5. Emirates (Arabic calligraphy)
6. Qatar Airways (oryx logo)
7. Air France (seahorse logo)
8. Swiss International (cross logo)

**Visual Specs**:
- Each logo in grayscale/muted colors
- Equal spacing between logos
- Logos sized consistently (approx 80px height)
- Subtle hover effects (color restoration on hover)

### 4. Hero Image Section
**Background Image**: High-resolution Berlin cityscape
- **Key Elements**: TV Tower (Fernsehturm) prominently featured, urban skyline
- **Image Treatment**: Slight blue overlay for text readability
- **Dimensions**: Full viewport width, approximately 400px height

**Text Overlay**:
- **Position**: Center-left of image
- **Main Text**: "Popular flights to Berlin" - large white text with shadow
- **Font**: Bold, sans-serif, highly readable
- **Background**: Semi-transparent dark overlay behind text for contrast

### 5. Flight Comparison Section (Moonsand Integration)
**Background**: White section with subtle border/shadow

**Top Section**:
- **Moonsand Logo**: Small logo on left
- **Headline**: "Save money when you compare flights with Moonsand"
- **Subtext**: Explanation of comparison benefits

**Popular Nearby Flights Widget**:
- **Title**: "Popular Nearby Flights" - bold, dark text
- **Route Examples**: Listed as "City A to Berlin" format
- **Price Display**: Currency and amount for each route
- **Layout**: Clean list format with spacing between routes

**Interactive Elements**:
- Search integration mockup
- Comparison table preview
- Green checkmarks for verified deals

### 6. Information Grid Section
**Background**: Dark navy blue
**Section Title**: "Useful information about Berlin, Germany" - white text, centered

**Grid Layout**: 4 columns × 2 rows = 8 cards total
**Card Design**:
- **Background**: White rounded rectangles
- **Size**: Equal sized cards with consistent spacing
- **Shadow**: Subtle drop shadow for depth

**Card Content Structure** (each card):
1. **Icon**: Colorful icon at top (transportation, weather, etc.)
2. **Title**: Bold heading text
3. **Description**: 2-3 lines of explanatory text
4. **Color Scheme**: Icons use brand colors (blue, orange, green accents)

**Specific Cards Visible**:
1. **Flight Information**: Airplane icon, flight details
2. **Airport Transfer**: Bus/train icon, transport options
3. **Weather**: Sun/cloud icon, climate info
4. **Currency**: Money/Euro icon, payment info
5. **Transportation**: Metro icon, public transit
6. **Emergency**: Medical cross icon, contact numbers
7. **Time Zone**: Clock icon, local time info
8. **Communication**: Phone icon, calling codes

### 7. Travel Guide Section
**Background**: White
**Layout**: Single column, left-aligned text

**Section Structure**:
- **Main Heading**: "Discover Berlin" - large, bold, dark text
- **Article Title**: "The best time to visit Berlin" - medium heading
- **Body Content**: Multiple paragraphs in readable typography

**Content Breakdown**:
- **Paragraph 1**: Introduction to Berlin as destination
- **Paragraph 2**: Weather patterns and seasons
- **Paragraph 3**: Tourist season recommendations
- **Paragraph 4**: Specific monthly advice

**Additional Sections**:
- **"How far in advance should you book flights to Berlin?"** - subheading with content
- **"Where to stay in Berlin"** - subheading with accommodation advice
- **"Top things to do in Berlin"** - subheading with activity suggestions

**Typography**:
- **Headings**: Bold, dark blue/black
- **Body Text**: Dark gray, readable font size
- **Line Spacing**: Generous for readability
- **Links**: Blue text with underlines

### 8. FAQ Section
**Background**: Light gray/off-white
**Title**: "Berlin—Frequently Asked Questions" - centered, bold

**FAQ Format**:
- **Question Format**: Bold, darker text
- **Answer Format**: Regular weight, slightly smaller text
- **Layout**: Single column, stacked questions

**Visible Questions**:
1. "What is the cheapest time to fly to Berlin?"
2. "How long should you spend in Berlin?"
3. "What is the currency in Berlin?"

**Interactive Elements**:
- Expandable/collapsible format implied
- Plus/minus icons for expansion
- Smooth animation transitions expected

### 9. Trending Destinations Footer
**Background**: White
**Title**: "Browse trending destinations" - centered, bold heading

**Grid Layout**: 6 columns of destination links
**Link Format**:
- **City Name**: Bold, blue clickable text
- **Country**: Smaller gray text below city
- **Spacing**: Consistent vertical and horizontal spacing

**Destinations Visible**:
- Multiple international cities
- Organized alphabetically or by popularity
- Hover effects on links (color change)

### 10. Newsletter Signup Section
**Background**: Light blue gradient
**Layout**: Centered content with testimonials

**Main Content**:
- **Headline**: "Get updates straight to your inbox, for free" - large, dark text
- **Email Form**: Input field + "Subscribe" button
- **Benefits List**: Bullet points of newsletter features

**Social Proof**:
- **Testimonials**: Customer review cards
- **Star Ratings**: 5-star rating displays
- **Review Text**: Short positive reviews
- **Customer Names**: Attribution for testimonials

### 11. Footer Section
**Background**: Very dark navy/black
**Text Color**: White and light gray

**Layout**: Multi-column layout
**Column 1 - Company Info**:
- **Moonsand Logo**: White version of logo
- **Description**: Company mission/description text
- **Social Icons**: Social media platform icons

**Column 2 - Information Links**:
- **Heading**: "Information"
- **Links**: About, Contact, Help, etc.

**Column 3 - Trending Destinations**:
- **Heading**: "Trending Destinations"
- **Links**: Popular city destinations

**Column 4 - International Sites**:
- **Heading**: "International sites"
- **Links**: Country/region specific sites

**Bottom Footer**:
- **Copyright**: "© 2024 Moonsand" - small gray text
- **Legal Links**: Privacy Policy, Terms, etc.
- **Language/Currency Selector**: Dropdown menus

## API Integration

**Reference**: See `resources/apis.md` for complete API documentation including:
- Location to IATA API (user location detection)
- Airlines by Destination API (get airline codes for destination)
- Airline Images API (logos from Kiwi.com)
- Flight Schedule API (timetables and routes)
- City Search API (autocomplete functionality)
- Grouped Prices API (flight prices by date)
- Nearest Places Matrix API (alternative routes and pricing)

## Search Widget Implementation

**TravelPayouts Widget Integration**:
- Uses third-party widget from `https://tp.media/content`
- Placeholder div: `<div class="tp-placeholder" id="tp-loader"></div>`
- Widget auto-populates with user's IATA (from location API)
- Destination IATA from data attribute: `data-destination-iata="BER"`
- Custom styling and branding parameters
- Shimmer loading animation during widget load

## Final Architecture

**SSR-First Approach** (99% Server-Side Rendered):
- All static content rendered server-side
- Real data from APIs integrated at build/request time
- Component-based architecture
- SEO-optimized structure

**Minimal CSR Requirements**:
1. **TravelPayouts Widget**: Third-party search form injection
2. **FAQ Sections**: Expand/collapse functionality (optional)
3. **User Location**: Detection for widget origin parameter

**Technology Stack**:
- **Runtime**: Bun
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4
- **TypeScript**: Full type safety
- **Data**: Real API integration (no mock data)

## Implementation Plan

1. Create API utility functions for all endpoints
2. Build main page with 11 sections using real data
3. Implement TravelPayouts widget integration
4. Add responsive design and styling
5. Test all API integrations