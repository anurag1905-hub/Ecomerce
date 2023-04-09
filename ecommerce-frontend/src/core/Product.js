import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import { read,listRelated } from './ApiCore';
import Card from './Card';

const Product = (props) => {
    const [product,setProduct] = useState({});
    const [relatedProduct,setRelatedProduct] = useState([]);
    const [error,setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data=>{
                    console.log(data);
                    if(data.error){
                        setError(data.error)
                    }
                    else{
                        setRelatedProduct(data);
                    }
                });
            }
        });
    }

    useEffect(()=>{
        // we get props due to react-router dom
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        // whenever user clicks on related products, there is a change in props(url bar) but component doesn't get updated to show
        // the related product which was clicked...so to solve this issue, props has been added.
    },[props]);

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">
            <div className='row'>
                <div className='col-8'>
                    {
                        product && product.description && <Card product={product} showViewProductButton={false} />
                    }
                </div>
                <div className='col-4'>
                    <h4>Related Products</h4>
                    {relatedProduct.map((p,i)=>(
                        <div key={i} className='mb-3'>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
     );
};

export default Product;

