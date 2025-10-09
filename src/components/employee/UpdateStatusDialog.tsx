import React from 'react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (status: string, progress: number, notes: string) => void;
  workItem: any;
}

export function UpdateStatusDialog({
  open,
  onOpenChange,
  onSubmit,
  workItem,
}: UpdateStatusDialogProps) {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState([0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (workItem) {
      setStatus(workItem.status);
      setProgress([workItem.progress]);
    }
  }, [workItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) return;

    onSubmit(status, progress[0], notes);
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            {workItem?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Progress</Label>
              <span className="text-sm text-gray-600">{progress[0]}%</span>
            </div>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Update Notes</Label>
            <Textarea
              id="notes"
              placeholder="Describe what you've completed or any issues..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Status</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
