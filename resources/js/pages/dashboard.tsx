import { CardDashboard } from '@/components/ui/card-dashboard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { User, ShoppingCart, Settings } from "lucide-react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


interface PageProps {
    totalUsers: number
    totalProducts: number
    totalRoles: number
    totalPermisos: number
 }

export default function Dashboard() {

    const { totalUsers, totalProducts, totalRoles, totalPermisos } = usePage().props as unknown as PageProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="text-gray-700 body-font"/>
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        <CardDashboard
                        title={totalUsers}
                        description="Usuarios"
                        iconSvg={<User className="w-12 h-12 text-indigo-500" />}
                        />

                        <CardDashboard
                        title={totalProducts}
                        description="Productos"
                        iconSvg={<ShoppingCart className="w-12 h-12 text-indigo-500" />}
                        />

                        <CardDashboard
                        title={totalRoles}
                        description="Roles"
                        iconSvg={<Settings className="w-12 h-12 text-indigo-500" />}
                        />

                        <CardDashboard
                        title={totalPermisos}
                        description="Permisos"
                        iconSvg={<User className="w-12 h-12 text-indigo-500" />}
                        />
                    </div>
                    </div>
                    </div>
                    <section/>
        </AppLayout>
    );
}
