import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

//PERMISOS
import { can } from '@/helpers/can';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number,
    name: string,
    email: string,
    roles: string[]
}

interface PageProps {
    flash: {
        message?: string
    },
    users: User[]
 }

export default function Index({ users }: PageProps) {

    const { flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
        //console.log("Delete" + id + name)
        if (confirm(`Delete User - ${id}. ${name}`)) {
            destroy(route('users.destroy', id));
            //router.delete(route('users.destroy', id)); //otra forma
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {can('users.create') && (<div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href={route('users.create')}>
                        <Button>Create New User</Button>
                    </Link>
                </div>)}


            <div className='m-4'>
                <div>
                {flash.message && (
                  <Alert>
                    <AlertTitle>Notification!</AlertTitle>
                    <AlertDescription>
                       {flash.message}
                    </AlertDescription>
                    </Alert>
                )}
                </div>
            </div>

            {users.length > 0 && (
            <div className='m-4'>
                <Table>
                <TableCaption>List Of Users</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className='text-center'>Editar</TableHead>
                    <TableHead className='text-center'>Eliminar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(({id, name, email, roles}) => (
                        <TableRow key={id}>
                        <TableCell className="font-medium">{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>
                            {roles.map(({id, name}: any) => (
                            <span key={id} className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
                                {name}
                            </span>
                            ))}
                        </TableCell>
                        <TableCell>{email}</TableCell>

                        {can('users.edit') && ( <TableCell className="text-center space-x-2">
                            <Link href={route('users.edit', id)}>
                            <Button className='bg-amber-500 hover:bg-amber-700'>
                                Edit
                            </Button>
                            </Link>
                        </TableCell>)}

                        {can('users.destroy') && ( <TableCell className="text-center space-x-2">
                            <Button
                            disabled = { processing }
                            onClick = {() => handleDelete(id, name)}
                            className='bg-red-500 hover:bg-red-700'>
                                Delete
                            </Button>
                        </TableCell>)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            )}
        </div>
        </AppLayout>
    );
}
