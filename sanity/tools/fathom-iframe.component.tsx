import styled from "styled-components"

import { useIframeUrl } from "./use-iframe-url.hook"

const StyledIframe = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`

export const FathomIframe = () => {
  const { loading, url, error } = useIframeUrl()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!url) return <div>Fathom not initialized correctly</div>
  return <StyledIframe id="fathom-viewer-iframe" src={url}></StyledIframe>
}
