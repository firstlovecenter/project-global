// export const sendBulkSMS = async (recipient: string[], message: string) => {
//   const sendMessage = {
//     method: 'post',
//     url: `https://api.mnotify.com/api/sms/quick?key=${SECRETS.MNOTIFY_KEY}`,
//     headers: {
//       'content-type': 'application/json',
//     },
//     data: {
//       recipient: SECRETS.TEST_PHONE_NUMBER
//         ? [SECRETS.TEST_PHONE_NUMBER, '0594760323']
//         : recipient,
//       sender: 'FLC Admin',
//       message,
//       is_schedule: 'false',
//       schedule_date: '',
//     },
//   }

//   try {
//     console.log('Sending SMS using mNotify')
//     const res = await axios(sendMessage)

//     if (res.data.code === '2000') {
//       console.log(res.data.message)
//       return 'Message sent successfully'
//     }

//     throw new Error(
//       `There was a problem sending your SMS ${JSON.stringify(res.data)}`
//     )
//   } catch (error: any) {
//     throwToSentry('There was a problem sending your message', error)
//   }

//   return 'Message sent successfully'
// }
