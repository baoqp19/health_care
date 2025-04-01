import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
 import { useSortable } from "@dnd-kit/sortable";
 import { Card, Col } from "antd";
 
 import { CSS } from "@dnd-kit/utilities";
 
// Định nghĩa kiểu cho note
interface Note {
    title: string;
    content: string;
    index: number;
  }
  
  // Định nghĩa các props cho SortableItem
  interface SortableItemProps {
    id: number; 
    note: Note; 
    onEdit: (note: Note) => void;
    onDelete: (index: number) => void; 
  }
  

 const SortableItem: React.FC<SortableItemProps>  = ({ id, note, onEdit, onDelete }) => {
   const { attributes, listeners, setNodeRef, transform, transition } =
     useSortable({ id });
 
   const style = {
     transform: transform ? CSS.Transform.toString(transform) : undefined,
     transition,
   };
 
   return (
     <Col
       ref={setNodeRef}
       style={style}
       {...attributes}
       {...listeners}
       span={6}
       className="mb-6"
     >
       <Card
         className="w-full"
         title={note.title}
         actions={[
           <EditOutlined key="edit" onClick={() => onEdit(note)} />,
           <DeleteOutlined key="delete" onClick={() => onDelete(note.index)} />,
         ]}
       >
         {note.content}
       </Card>
     </Col>
   );
 };
 
 export default SortableItem;