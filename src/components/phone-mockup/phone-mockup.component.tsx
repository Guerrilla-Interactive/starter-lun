import React from "react"

// Define the props type
interface PhoneMockupProps {
  children?: React.ReactNode
  showNotch?: boolean
  showTopBar?: boolean
  showSleepButton?: boolean
  showBottomBar?: boolean
  showVolumeButton?: boolean
  showShadows?: boolean
  background?: string
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  showNotch = true,
  showTopBar = true,
  showSleepButton = true,
  showBottomBar = true,
  showVolumeButton = true,
  showShadows = true,
  background = "bg-lunnheim-ivory-yellow",
}) => {
  return (
    <div className={`marvel-device  iphone-x`}>
      {showNotch && (
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
      )}
      {showTopBar && <div className="top-bar"></div>}
      {showSleepButton && <div className="sleep"></div>}
      {showBottomBar && <div className="bottom-bar"></div>}
      {showVolumeButton && <div className="volume"></div>}
      {showShadows && (
        <div className="overflow">
          <div className="shadow--tr shadow"></div>
          <div className="shadow--tl shadow"></div>
          <div className="shadow--br shadow"></div>
          <div className="shadow--bl shadow"></div>
        </div>
      )}
      <div className="inner-shadow"></div>
      <div className={`screen ${background} overflow-scroll`}>{children}</div>
    </div>
  )
}
