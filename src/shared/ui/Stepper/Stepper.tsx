import PlusButton from '../../../assets/plus-button.svg?react'
import MinusButton from '../../../assets/minus-button.svg?react'
import styles from './style.module.scss'
import { useEffect, useState } from 'react'
import { Button } from '@mantine/core'

interface StepperProps {
    onStep: (count: number) => void,
    quantity?: number
    itemId?: number
}

const Stepper = ( { onStep, quantity = 1 }:StepperProps ) => {
    const [count, setCount] = useState<number>(quantity)

    useEffect(() => {
        setCount(quantity)
    }, [quantity])

    const handleDecrement = () => {
        if (count !== 0) {
            const newCount = count - 1
            setCount(newCount)
            onStep(newCount)
        }
    }

    const handleIncrement = () => {
            const newCount = count + 1
            setCount(newCount)
            onStep(newCount)
    }

    return (
        <div className={styles['stepper-container']}>
            <Button data-testid='decrement' className={styles['stepper-button']} onClick={() => {
                handleDecrement()
            }}>
                <MinusButton />
            </Button>
            {count}
            <Button data-testid='increment' className={styles['stepper-button']} onClick={() => {
                handleIncrement()
                }}>
                <PlusButton />
            </Button>
        </div>
    )

}

export default Stepper