import AddToCartButton from "../../../features/AddToCartButton/AddToCartButton"
import Stepper from "../../../shared/ui/Stepper/Stepper"
import { Card, Text, Image } from "@mantine/core"
import styles from './style.module.scss'
import { useState } from "react"
import type { DataItemType } from "../../../shared/utils/types"
import Loader from '../../../assets/loader.svg?react'

interface ProductProps {
    data: DataItemType
    isLoading?: boolean
}


const ItemCard = ({ data, isLoading }: ProductProps) => {
    const [stepperCount, setStepperCount] = useState<number>(1)

    if (isLoading) {
        return (
            <div className={styles['loading-card']}>
                <div className={styles['loading-image']}>
                    <Loader data-testid='loader' /> 
                </div>
            </div>
        )
    }

    const [name, quantity = '1 kg'] = data.name.split(' - ')

    const handleStepperCounts = (count: number) => {
        setStepperCount(count)
    }


    return (
        <Card className={styles['item-card']}>
            <Card.Section className={styles['image-section']}>
                <Image src={data.image} className={styles['card-image']} />
            </Card.Section>
            <Card.Section className={styles['name-section']}>
                <Text className={styles['product-name']}>{name}</Text>
                <Text className={styles['product-quantity']}>{quantity}</Text>
                <Stepper onStep={handleStepperCounts} itemId={data.id} />
            </Card.Section>
            <Card.Section className={styles['price-section']}>
                <Text>{`$ ${data.price}`}</Text>
                <AddToCartButton  stepperCount={stepperCount} data={data}
                />
            </Card.Section>
        </Card>
    )
}
    

export default ItemCard