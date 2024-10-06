import type { CSSProperties, ElementType } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableProps {
  id: string;
  children?: React.ReactNode;
  element?: ElementType;
  overlay?: boolean;
}

export function Draggable({ id, element, children, overlay }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const Element = element ?? "div";
  const style: CSSProperties = {
    background: "blue",
    transform: !overlay ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <Element
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </Element>
  );
}
