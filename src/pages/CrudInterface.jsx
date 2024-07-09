import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { addRecord, updateRecord, deleteRecord } from "@/api/crudApi";

const CrudInterface = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch initial data here
    // For now, we'll use some mock data
    setRecords([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        const updatedRecord = await updateRecord({ ...formData, id: editingId });
        setRecords((prev) =>
          prev.map((record) =>
            record.id === editingId ? updatedRecord : record
          )
        );
        setEditingId(null);
        toast.success("Record updated successfully");
      } else {
        const newRecord = await addRecord(formData);
        setRecords((prev) => [...prev, newRecord]);
        toast.success("Record added successfully");
      }
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (record) => {
    setFormData({ name: record.name, email: record.email });
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      setRecords((prev) => prev.filter((record) => record.id !== id));
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Interface</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">{editingId !== null ? "Update" : "Add"} Record</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(record)} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CrudInterface;