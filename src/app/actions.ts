'use server'

import { Resend } from 'resend';

import type { OrderEmailProps} from "../emails/order-success";
import { OrderConfirmEmailToClient, OrderEmailPropsSchema } from "../emails/order-success"
import { OrderConfirmEmailToAdmin } from '../emails/order-success-admin';



// TODO
// Danger
// Note that since we are not doing any authentication on this server action body, anyone can publically
// call this function resulting in an email sent by our server to the given user.
// One way to securely do it is to check for a valid payment recepit, or some identification number  
// based on which we can ensure that the client has done payment. Still, need to prevent one user
// who paid one from invoking this email function more than once.
export async function sendOrderEmail(props: OrderEmailProps): Promise<{ success: boolean, message: string }> {

	// This is the email address that the emails will be sent from
	const SEND_EMAIL_FROM = 'mail@lunnheim.com'
	// This is the email address of the seller that we want to notify when there's a new order by a client
	const ADMIN_EMAIL = 'suman@guerrilla.no'

	// Validate the input data
	const parsedProps = OrderEmailPropsSchema.safeParse(props)
	if (!parsedProps.success) {
		return { success: false, message: 'invalid data format' }
	}
	// Here, we can assume that the structure/type of props is valid
	// as we have performed validation by Zod 

	// Setup resend
	const resend = new Resend(process.env.RESEND_API);

	// Send email to client
	const clientEmail = parsedProps.data.client.email

	let clientEmailResponseMsg

	try {
		const clientEmailRespone = await resend.emails.send({
			from: SEND_EMAIL_FROM,
			to: clientEmail,
			subject: 'Order Received',
			react: OrderConfirmEmailToClient({ ...props })
		})
		if (clientEmailRespone.error) {
			console.error(clientEmailRespone.error)
			clientEmailResponseMsg = { success: false, message: `${clientEmailRespone.error.message}.` }
		}
		clientEmailResponseMsg = { success: true, message: '' }
	}
	catch (e) {
		console.error('error sending email to client')
		console.error(e)
		clientEmailResponseMsg = { success: false, message: 'Error sending email to client.' }
	}


	let adminEmailResponseMessage

	try {
		const adminEmailResponse = await resend.emails.send({
			from: SEND_EMAIL_FROM,
			to: ADMIN_EMAIL,
			subject: 'New Order',
			react: OrderConfirmEmailToAdmin({ ...props })
		})
		if (adminEmailResponse.error) {
			console.error(adminEmailResponse.error)
			adminEmailResponseMessage = { success: false, message: `${adminEmailResponse.error.message}` }
		}
		adminEmailResponseMessage = { success: true, message: '' }
	}
	catch (e) {
		console.error('error sending email to admin')
		console.error(e)
		adminEmailResponseMessage = { success: false, message: 'Error sending email to admin.' }
	}

	// Note that here, we are returning single response object that  displays the success status
	// based on whether both the email to client and email to admin went through.
	return {
		success: clientEmailResponseMsg.success && adminEmailResponseMessage.success,
		message: `${clientEmailResponseMsg.message} ${adminEmailResponseMessage.message}`
	}

}
