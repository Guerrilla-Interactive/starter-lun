import { LinkResolver } from "@/components/utils/link-resolver.component"
import { Container, GapY } from "@/src/components/nextgen-core-ui"

const NotFound = () => {
  return (
    <Container className="mx-auto mt-[30vh] flex h-96 w-96 max-w-sm -skew-x-3 flex-col items-center rounded-full  bg-lunnheim-pale-yellow bg-opacity-40 text-center  text-lunnheim-darker-olive">
      <h1 className="mt-[3vh] font-serif text-[10rem]  text-lunnheim-dark-olive">
        404
      </h1>
      <GapY gap-y-2>
        <p className="mt-[-2vh] text-lunnheim-dark-olive  ">
          Where are you? Please come home!
        </p>
        <LinkResolver
          linkType="internal"
          className="font-serif text-lunnheim-dark-olive underline hover:text-lunnheim-olive active:text-lunnheim-dark-olive"
          link={{
            _type: "frontpage",
          }}
        >
          Take me heim!
        </LinkResolver>
      </GapY>
    </Container>
  )
}

export default NotFound
