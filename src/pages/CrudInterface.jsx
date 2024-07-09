import { useState } from "react";
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

const CrudInterface = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would send this data to your Zapier webhook
      // For now, we'll just update the local state
      if (editingId !== null) {
        setRecords((prev) =>
          prev.map((record) =>
            record.id === editingId ? { ...formData, id: editingId } : record
          )
        );
        setEditingId(null);
        toast.success("Record updated successfully");
      } else {
        const newRecord = { ...formData, id: Date.now() };
        setRecords((prev) => [...prev, newRecord]);
        toast.success("Record added successfully");
      }
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (record) => {
    setFormData({ name: record.name, email: record.email });
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      // In a real application, you would send a delete request to your Zapier webhook
      // For now, we'll just update the local state
      setRecords((prev) => prev.filter((record) => record.id !== id));
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("An error occurred");
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