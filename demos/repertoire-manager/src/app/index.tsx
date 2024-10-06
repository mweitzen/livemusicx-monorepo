import { useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  useDroppable,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
  DragStartEvent,
} from "@dnd-kit/core";
import { Draggable } from "../components/draggable";
import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";

export function DnDTest() {
  const containers = ["A", "B", "C"];
  const items = ["1", "2", "3", "4", "5"];
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    setActiveId(null);
    setParent(over?.id ?? null);
  }

  return (
    <div className='w-full h-full grid place-items-center'>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ScrollArea className='h-28'>
          {items.map((id) => (
            <Draggable
              key={id}
              id={id}
              overlay
            >
              <Button>Item ${id}</Button>
            </Draggable>
          ))}
        </ScrollArea>
        {createPortal(
          <DragOverlay>
            {activeId ? <Button>Item ${activeId}</Button> : null}
          </DragOverlay>,
          document.body
        )}
        {parent === null ? (
          <Draggable
            id='draggable'
            element='div'
            overlay
          >
            Test
          </Draggable>
        ) : null}

        {containers.map((id) => (
          <Droppable
            key={id}
            id={id}
          >
            {parent === id ? (
              <Draggable
                id='draggable'
                element='div'
                overlay
              >
                Test
              </Draggable>
            ) : (
              "Drop here"
            )}
          </Droppable>
        ))}
      </DndContext>
    </div>
  );
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    background: isOver ? "green" : undefined,
    width: "300px",
    height: "300px",
    border: "1px solid black",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      {children}
    </div>
  );
}
