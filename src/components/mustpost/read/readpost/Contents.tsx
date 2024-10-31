"use client";

import { Viewer } from "@toast-ui/react-editor";

interface ContentsProps {
  content: string;
}

function Contents({ content }: ContentsProps) {
  return (
    <div className="py-5 md:py-10 border-b">
      <Viewer initialValue={content} />
    </div>
  );
}

export default Contents;
