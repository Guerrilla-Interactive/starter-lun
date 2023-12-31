import {
	Body,
	Container,
	Heading,
	Head,
	Hr,
	Html,
	Preview,
	Img,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';
import { OrderDetails, OrderEmailProps } from "./order-success"

export const OrderConfirmEmailToAdmin = ({ client, items }: OrderEmailProps) => {
	const itemsList = items.map(x => x.name).join(", ")
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							brand: "#007291",
						},
					},
				},
			}}
		>
			<Html>
				<Head />
				<Preview>
					New order by {client.firstName} for {itemsList}
				</Preview>
				<Body className='bg-white text-black font-sans'>
					<Heading>
						You have received a new order as follows:
					</Heading>

					<Container className=''>
						<Section className={''}>
							<Text className={''}>
								Client Details:
							</Text>
							<Text className={''}>
								Name: {client.firstName} {client.lastName}
							</Text>
							<Text className={''}>
								Address: {client.address}
							</Text>
							<Text className={''}>
								Email: {client.email}
							</Text>
							<Text className={''}>
								Phone: {client.phone}
							</Text>
							<Text className={''}>
								City: {client.city}
							</Text>
							<Text className={''}>
								Postalcode: {client.postalCode}
							</Text>
							<Text className={''}>
								Meta: {client.metadata}
							</Text>
						</Section>
						<OrderDetails items={items} totalPrice={client.price} />
						<EmailClosing />
					</Container>
				</Body>
			</Html>
		</Tailwind>
	)
}

export function EmailClosing() {
	return (<Container>

		<Hr className={'border-t-lunnheim-pale-yellow mt-4 w-[320px]'} />
		<Text className='w-[320px]'>

			Best regards,
			<br />
			<Img className="mt-1" height={19} width={93} src="https://cdn.sanity.io/images/izge1v72/production/e4fb1bb2955a4cc7a74f31ed4007189fed453175-372x76.png" />
		</Text>




	</Container>

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
}

export const SampleOrderItem = {
	id: 'slkdjglkj3kl',
	name: 'Table',
	variant: 'Red',
	price: 1000,
	quantity: 1,
	imageUrl: ''
}

export const SampleOrderItem2 = {
	id: 'slkdjglkj3kl',
	name: 'Chair',
	date: new Date(),
	price: 2500,
	quantity: 3,
	imageUrl: '',
	variant: 'Leather Black',
}

const SampleOrderConfirmedAdmin = () => <OrderConfirmEmailToAdmin client={client} items={[SampleOrderItem, SampleOrderItem2]} />
export default SampleOrderConfirmedAdmin
