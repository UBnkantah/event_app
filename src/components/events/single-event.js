import React, {useRef, useState, } from "react"
import Image from "next/image"
import { useRouter } from "next/router";

const SingleEvent = ({data}) => {
    const inputEmail = useRef()

    const router = useRouter()

    const onSubmit = async(e) => {
        e.preventDefault()
        const emailValue = inputEmail.current.value
        const eventId = router?.query.id;

        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailValue, eventId })
            });

            if(!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json();
            console.log('POST', data);
            //POST fetch request
            //body emailValue and the eventId
        } catch(e) {
            console.log('ERROR', e)
        }
    }
  return (
    <div>
      <h1>{data.title}</h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Get Register for this event</label>
        <input ref={inputEmail} type='email' id="email" placeholder="Please insert your email" />
        <button type="button">Submit</button>
      </form>
    </div>
  )
}

export default SingleEvent
