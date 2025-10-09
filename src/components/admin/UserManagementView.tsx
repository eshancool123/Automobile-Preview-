import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Plus, Search, Edit2, Trash2, UserCheck, UserX } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { UserDialog } from './UserDialog';
import { toast } from 'sonner@2.0.3';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'employee' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: Date;
  lastActive: Date;
}

export function UserManagementView() {
  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      status: 'active',
      joinedDate: new Date('2025-01-15'),
      lastActive: new Date('2025-10-03'),
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'employee',
      status: 'active',
      joinedDate: new Date('2024-06-20'),
      lastActive: new Date('2025-10-03'),
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'customer',
      status: 'active',
      joinedDate: new Date('2025-09-10'),
      lastActive: new Date('2025-10-02'),
    },
    {
      id: '4',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'employee',
      status: 'inactive',
      joinedDate: new Date('2024-03-15'),
      lastActive: new Date('2025-09-20'),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = (data: any) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...data } : user
        )
      );
      toast.success('User updated successfully');
    } else {
      const newUser: UserAccount = {
        id: Date.now().toString(),
        ...data,
        joinedDate: new Date(),
        lastActive: new Date(),
      };
      setUsers((prev) => [newUser, ...prev]);
      toast.success('User created successfully');
    }
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleEditUser = (user: UserAccount) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success('User deleted successfully');
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'active' ? ('inactive' as const) : ('active' as const),
            }
          : user
      )
    );
    toast.success('User status updated');
  };

  const renderUserTable = (userList: UserAccount[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={
                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                }
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.lastActive.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleStatus(user.id)}
                  title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  {user.status === 'active' ? (
                    <UserX className="h-4 w-4" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditUser(user)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const customers = filteredUsers.filter((u) => u.role === 'customer');
  const employees = filteredUsers.filter((u) => u.role === 'employee');
  const admins = filteredUsers.filter((u) => u.role === 'admin');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">User Management</h2>
          <p className="text-gray-600 mt-1">Manage customer and employee accounts</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {users.filter((u) => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{employees.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
              <TabsTrigger value="employees">Employees ({employees.length})</TabsTrigger>
              <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {renderUserTable(filteredUsers)}
            </TabsContent>
            <TabsContent value="customers" className="mt-6">
              {renderUserTable(customers)}
            </TabsContent>
            <TabsContent value="employees" className="mt-6">
              {renderUserTable(employees)}
            </TabsContent>
            <TabsContent value="admins" className="mt-6">
              {renderUserTable(admins)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <UserDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingUser(null);
        }}
        onSubmit={handleCreateUser}
        initialData={editingUser}
      />
    </div>
  );
}
