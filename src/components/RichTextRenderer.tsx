interface RichTextNode {
  type: string;
  text?: string;
  tag?: string;
  fields?: {
    url?: string;
    linkType?: string;
  };
  children?: RichTextNode[];
}

interface RichTextRendererProps {
  content: {
    root: {
      type: string;
      children: RichTextNode[];
      version: number;
    };
  };
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    switch (node.type) {
      case 'heading':
        const HeadingTag = node.tag as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="font-bold text-gray-900 mb-6 text-xl">
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </HeadingTag>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 mb-6 leading-relaxed text-base">
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </p>
        );
      
      case 'text':
        return node.text;
      
      case 'link':
        return (
          <a
            key={index}
            href={node.fields?.url}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </a>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-none">
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}