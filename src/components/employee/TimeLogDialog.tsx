import React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface TimeLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (hours: number) => void;
  workItem: any;
}

export function TimeLogDialog({
  open,
  onOpenChange,
  onSubmit,
  workItem,
}: TimeLogDialogProps) {
  const [hours, setHours] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(hours);
    if (!hoursNum || hoursNum <= 0) return;

    onSubmit(hoursNum);
    setHours('');
    setNotes('');
  };

  const quickLog = (hrs: number) => {
    onSubmit(hrs);
    setHours('');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Log Time</DialogTitle>
          <DialogDescription>
            {workItem?.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => quickLog(0.25)}>
              +15m
            </Button>
            <Button variant="outline" size="sm" onClick={() => quickLog(0.5)}>
              +30m
            </Button>
            <Button variant="outline" size="sm" onClick={() => quickLog(1)}>
              +1h
            </Button>
            <Button variant="outline" size="sm" onClick={() => quickLog(2)}>
              +2h
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or enter custom time</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                step="0.25"
                min="0.25"
                placeholder="e.g., 1.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="What did you work on?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Log Time</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
