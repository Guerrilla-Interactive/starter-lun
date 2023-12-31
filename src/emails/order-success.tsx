import {
	Img,
	Body,
	Container,
	Head,
	Heading,
	Column,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
	Row,
	Hr,
} from '@react-email/components';
import * as React from 'react';
import { EmailClosing } from './order-success-admin';
import { date, z } from "zod"

import LogoImage from './small-lunnheim-pale-yellow-logo.png'
import { ShoppingCartItemSchema } from '../app/context/global-context';


export type ShoppingCartItem = z.infer<typeof ShoppingCartItemSchema>

// Note that we're created a zod schema because we would need to validate   
// this data as we send it over nextjs actions to send email to client 
const OrderClientSchema = z.object({
	// When was the order made
	price: z.number().gt(0),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().min(1).email(),
	phone: z.string(),
	address: z.string(),
	city: z.string(),
	postalCode: z.string(),
	metadata: z.string().optional(),
	date: z.date().optional()

})

export const OrderEmailPropsSchema = z.object({
	client: OrderClientSchema,
	items: z.array(ShoppingCartItemSchema)
})

export type OrderClient = z.infer<typeof OrderClientSchema>
export type OrderEmailProps = z.infer<typeof OrderEmailPropsSchema>


export const OrderDetails = ({ items, totalPrice }: { items: Array<ShoppingCartItem>, totalPrice: number }) => {
	return (
		<Container className='w-[320px]'>

			<Section className={'w-[320px]'}>
				<Container className=" rounded-md w-[320px]">
					{items.map(x => (
						<Row key={x.id} className=" bg-lunnheim-background-shade-1 p-2 mb-2 text-left ">
							<Column className="w-[75px] h-[100px] rounded-md overflow-hidden">
								<Img src={x.imageUrl} width={75} height={100} alt={x.name} className='' />
							</Column>
							<Column className="gap-y-0 pl-4 w-[220px] ">
								<Text className="my-0 text-sm">{x.name}</Text>
								<Row>
									<Column className="w-[110px]">
										<Text className="my-1 text-xs">{x.variant}</Text>
									</Column>
									<Column className="w-[110px]">
										<Text className="my-1 text-xs text-right">NOK {x.price}</Text>
									</Column>
								</Row>
							</Column>
						</Row>

					))}
					<Text className={''}>
						Total: NOK {totalPrice},00
					</Text>
				</Container>
			</Section>

		</Container>
	)
}

export const OrderConfirmEmailToClient = ({ client, items }: OrderEmailProps) => {
	const itemsList = items.map(x => x.name).join(", ")
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							"lunnheim-olive": "#AA9966",
							"lunnheim-dark-olive": "#474224",
							"lunnheim-darker-olive": "#302C19",
							"lunnheim-pale-yellow": "#E9D1A0",
							"lunnheim-ivory-yellow": "#FFF6DE",
							"lunnheim-vibrant-yellow": "#FFBE2E",
							"lunnheim-dusty-pink": "#EFB9AB",
							"lunnheim-light-pink": "#FBF2EF",
							"lunnheim-black": "#000000",
							"lunnheim-white": "#FFFFFF",
							"lunnheim-background-shade-1": "#F9F0D6",
							"lunnheim-background-shade-2": "#F7EDD2",
							"lunnheim-background-shade-3": "#EBE1C2"
						},
					},
				},
			}}
		>
			<Html className="w-full h-full   p-4 mx-auto">
				<Head />
				<Preview>
					We have received your order for {itemsList}
				</Preview>
				<Body className='text-lunnheim-darker-olive text-center py-24 p-4   bg-lunnheim-ivory-yellow max-w-[450px]    font-sans mx-auto  rounded-xl'>
					<Container className="w-[360px] mx-auto">
						<Img src={"https://cdn.sanity.io/images/izge1v72/production/781ebf6062ebf02237802e33184324b22b528b34-82x98.png"} className="mx-auto pt-12 pb-4" width="35" height="45" />

						<Heading className='text-lunnheim-olive font-thin text-lg'>
							Receipt from Lunnheim
						</Heading>
						<Text className="text-lunnheim-dark-olive">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Thank you for your order.
						</Text>
						<Container className='text-left w-[300px]'>
							<Container className="p-4 text-lunnheim-dark-olive w-[300px] ">
								<Row className="w-[300px] ">
									<Column className="w-[60px]">
										<Text>OrderId:</Text>
									</Column>
									<Column className="w-full">
										<Text className={'text-right'}>#523124</Text>
									</Column>
								</Row>
								<Hr className="border-t-lunnheim-pale-yellow " />
								<Row className="w-[300px]">
									<Column className="w-[60px]">
										<Text>Customer:</Text>
									</Column>
									<Column className="w-full">
										<Text className={'ml-auto text-right'}>{client.firstName} {client.lastName} </Text>
									</Column>
								</Row>
								<Hr className="border-t-lunnheim-pale-yellow " />
								<Row className="w-[300px]">
									<Column className="w-[60px]">
										<Text>Date:</Text>
									</Column>
									<Column className="w-full">
										<Text className={'text-right'}>21/12/2023</Text>
									</Column>
								</Row>
							</Container>


							<Text className={''}>

							</Text>
							<OrderDetails items={items} totalPrice={client.price} />
							<EmailClosing />
						</Container>
					</Container>

				</Body>
			</Html>
		</Tailwind >
	)
}

const client = {
	price: 100,
	firstName: 'Suman',
	lastName: 'Chapai',
	email: 'sumanchapai@gmail.com',
	phone: '+977 9866064210',
	address: 'Sarangkot Top Tole',
	city: 'Pokhara',
	postalCode: '',
	metadata: '',
	date: new Date()
}
const SampleOrderConfirmedClient = () => <OrderConfirmEmailToClient client={client} items={[]} />
export default SampleOrderConfirmedClient
