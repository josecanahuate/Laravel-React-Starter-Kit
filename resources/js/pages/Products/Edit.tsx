import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



type ProductUpdateForm =  {
    id: number;
    name: string;
    description: string;
    price: string;
}

interface Props {
    product: ProductUpdateForm
}

export default function Edit({product} : Props) {

  const { data, setData, put, processing, errors } = useForm<ProductUpdateForm>({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Update a Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link href={route('products.index')}>
                        <Button>Back</Button>
                    </Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <form method="POST" className="flex flex-col gap-6" onSubmit={handleUpdate}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="product name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Product Name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="text"
                            tabIndex={2}
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            tabIndex={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update
                    </Button>
                </div>
            </form>
                </div>
            </div>
        </AppLayout>
    );
}
