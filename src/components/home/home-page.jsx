import Link from "next/link"
import Image from "next/image"

export const HomePage = ({data}) => {
    return (
        <main>
            {data?.map((ev) => (
            <Link key={ev.id} href={`/events/${ev.id}`}>
                <Image src={ev.image} width={200} height={100} alt={ev.title}/>
                <h2>{ev.title}</h2>
                <p>{ev.description}</p>
            </Link>
            ))}
        </main>
    )
}