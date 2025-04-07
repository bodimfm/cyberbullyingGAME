declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  export type DraggableId = string;
  export type DroppableId = string;
  export type DragStart = any;
  export type DropResult = any;
  export type ResponderProvided = any;
  export type DraggableRubric = any;
  export type DroppableProvided = any;
  export type DroppableStateSnapshot = any;
  export type DraggableProvided = any;
  export type DraggableStateSnapshot = any;
  export type OnDragEndResponder = (result: DropResult, provided: ResponderProvided) => void;
  export type OnDragStartResponder = (start: DragStart, provided: ResponderProvided) => void;

  export const Droppable: React.ComponentType<{
    droppableId: DroppableId;
    type?: string;
    mode?: 'standard' | 'virtual';
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    direction?: 'horizontal' | 'vertical';
    ignoreContainerClipping?: boolean;
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
  }>;

  export const Draggable: React.ComponentType<{
    draggableId: DraggableId;
    index: number;
    isDragDisabled?: boolean;
    disableInteractiveElementBlocking?: boolean;
    shouldRespectForcePress?: boolean;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => React.ReactElement;
  }>;

  export const DragDropContext: React.ComponentType<{
    onDragEnd: OnDragEndResponder;
    onDragStart?: OnDragStartResponder;
    onDragUpdate?: any;
    children: React.ReactNode;
  }>;

  export function resetServerContext(): void;
}