import React, { useEffect, useState } from 'react'
import fetchProductsByCategoryId from '../actions/fetch-products-by-category-id.tsx'

interface ProductProps {
    categoryId: number
}

interface Variant {
    product_id: number;
    product_name: string;
    image_url: string;
    color_code: string;
    color_image_url: string;
    price: number;
  }

const Product = ({categoryId}) => {

    const [products, setProducts] = useState<Variant[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const data = await fetchProductsByCategoryId(categoryId)
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
        }

        fetchProducts()
    }, [categoryId])

    const groupedProducts: Record<number, Variant[]> = products.reduce((acc, product) => {
        if (!acc[product.product_id]) {
            acc[product.product_id] = [];
        }
        acc[product.product_id].push(product);
        return acc;
    }, {} as Record<number, typeof products>);
    
    const changeImage = (productId: string, colorCode: string, imageUrl: string) => {
        const photoImage = document.getElementById(`photo_${productId}`) as HTMLImageElement | null;       
            
        if (!photoImage) return;
    
        photoImage.src = imageUrl;
        photoImage.dataset.color = `${productId}_${colorCode}`;
        
        const parentAnchor = photoImage.closest("a");
        if (parentAnchor) {
            const url = new URL(parentAnchor.href, window.location.origin);
            url.searchParams.set("color", colorCode);
            parentAnchor.href = url.toString();
        }
    };
    

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Object.entries(groupedProducts).map(([productId, variants]) => {
            const firstVariant = variants[0]; // Use first variant as the main display

            return (
                <div key={productId} id={`product_${productId}`} className="flex flex-col mb-10" data-product-id={productId}>
                    <div id="product_variant">
                        <a href={`/${productId}?color=${firstVariant.color_code}`}>
                            <img
                                id={`photo_${productId}`}
                                className="object-cover mb-2 h-auto w-full"
                                src={`..${firstVariant.image_url}`}
                                alt={firstVariant.product_name}
                            />
                        </a>
                        <div className="pl-2">
                            <h4 className="capitalize text-sm font-medium">{firstVariant.product_name}</h4>
                            <p className="text-xs">€ {firstVariant.price}</p>
                        </div>
                        <ul className="flex h-6 mt-4 ml-2 gap-x-2">
                            {variants.map((variant) => (
                                <li key={variant.color_code} className="border-b border-transparent hover:border-black transition-all duration-200 pb-1">
                                    <a href="" onClick={e => e.preventDefault()}>
                                        <img
                                            className="border border-gray-200 h-full"
                                            src={`..${variant.color_image_url}`}
                                            alt=""
                                            onClick={() => changeImage(productId, variant.color_code, variant.image_url)}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        })}
    </div>
  )
}

export default Product