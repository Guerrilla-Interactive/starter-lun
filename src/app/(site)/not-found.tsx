import { LinkResolver } from "@/components/utils/link-resolver.component"
import { Container, GapY } from "@/src/components/nextgen-core-ui"

const NotFound = () => {
  return (
    <Container className="mx-auto mt-[30vh] flex h-96 w-96 max-w-sm -skew-x-3 flex-col items-center rounded-full  bg-opacity-40 text-center ">
      <h1 className="mt-[3vh] font-serif text-[10rem]  ">
        404
      </h1>
      <GapY gap-y-2>
        <p className="mt-[-2vh]  ">
          Where are you? Please come home!
        </p>
        <LinkResolver
          linkType="internal"
          className="font-serif "
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
