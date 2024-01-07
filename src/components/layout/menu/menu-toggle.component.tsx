"use client"

import React from "react"
import { animated,useSprings } from "react-spring"

import { useGlobalContext } from "@/src/context/global-context"
import { cn } from "@/utils/cn.util"

import { Absolute, Relative } from "../../nextgen-core-ui"

interface ToggleProps {
  isCart?: boolean
  className?: string
  isOpen: boolean // Add this line
  setIsOpen: () => void // Add this line
}

const cartPathsOpen = [
  // "M0 12.7994L0.000975034 11.4647L0 4L1.66962 4L1.66962 11.5L8.79605 11.5C10.599 11.5 10.5621 8.84617 10.5621 8.84617L10.5621 4.5L12 4.5L12 12.1812L10.3304 12.1812C10.0661 11.7524 8.5 12.2994 1.66962 12.7994L0 12.7994Z",
  // "M11 5.0001C11 5.0001 8.75718 1.77578 7 1.5C5.4347 1.25433 3 3.28581 3 3.28581C3 3.28581 3.98256 0.357146 6.59469 0.357146C9.20681 0.357146 11 5.0001 11 5.0001Z",
  // "M12 5C12 5 8.8 4.1257 4.8 4.1257C4.8 4.1257 1.6 4.1257 0 4.34972C0 2.8141 2.4 2.81408 5.6 3.25135C10.3794 3.90445 12 5 12 5Z",

  // "M11 10.6763C11 10.6763 7.667 13.5 5.5 13.5C3.333 13.5 0 10.6763 0 10.6763V3H2C2 3 2.61699 6.5 5.5 6.5C8.38301 6.5 9 3 9 3H11V10.6763Z",
  // "M9 2.85714C9 2.85714 7 0 5.5 0C4 0 3.36683 1.74136 2 2.85714V5L2.5 6C2.5 6 4.33099 2.14286 5.5 2.14286C6.66901 2.14286 8.5 6 8.5 6L9 5V2.85714Z"

  // "M11 12.6763C11 12.6763 7.667 14 5.5 14C3.333 14 0 12.6763 0 12.6763V4H2C2 4 2.61699 7.5 5.5 7.5C8.38301 7.5 9 4 9 4H11V12.6763Z",
  // "M9 3.57143C9 3.57143 7 0 5.5 0C4 0 3.36683 1.78617 2 3.57143V7H3.27273C3.27273 7 4.33099 1 5.5 1C6.66901 1 7.72727 7 7.72727 7H9V3.57143Z",

  // "M11 11.6763C11 11.6763 7.667 16 5.5 16C3.333 16 0 11.6763 0 11.6763V3H2C2 3 2.61699 6.5 5.5 6.5C8.38301 6.5 9 3 9 3H11V11.6763Z",
  // "M9 2.57143C9 2.57143 7 0 5.5 0C4 0 3.36683 0.786175 2 2.57143V6H3.27273C3.27273 6 4.33099 2 5.5 2C6.66901 2 7.72727 6 7.72727 6H9V2.57143Z",

  // "M11 11.6763C11 11.6763 7.667 14 5.5 14C3.333 14 0 11.6763 0 11.6763V3H2C2 3 2.61699 5.5 5.5 5.5C8.38301 5.5 9 3 9 3H11V11.6763Z",
  // "M9 2.57143C9 2.57143 7 0 5.5 0C4 0 3.36683 0.786175 2 2.57143V6H3.27273C3.27273 6 4.33099 2 5.5 2C6.66901 2 7.72727 6 7.72727 6H9V2.57143Z",

  // "M10.9 3.93039C10.73 3.93039 7.9 2.27 7.9 2.27C7.9 2.27 7.5 1 6 0.5C4.8 0.1 3.67 0.83 3 2C3 2 2.44 2.61 2 2.89C1.31 3.33 0 4.16039 0 4.16039V11.4004C3.6 14.2004 8.83 12.5704 11 11.4004L10.9 3.93039ZM5.5 1.39C6.38 1.59 6.7 2.91039 6.92 3.72039C5.72 3.94039 4.46 3.92039 3.52 3.76039C3.63 2.43039 4.58 1.18 5.5 1.39ZM10 11.0004C6.46 12.8304 3.26 11.6504 1 11.0004C1.26 8.43039 1.18 7.04039 1 4.79039C1.7 4.55039 2.5 4.5 3 5.5C4.07 6.63 6.34 6.11 7.63 5.53C8.5 4.5 9.11 4.57039 10 4.79039C9.65 5.01039 9.58 8.31039 10 11.0004Z"

  // "M10.9 3.54188C10.73 3.54188 7.9 1.88417 7.9 1.88417C7.9 1.88417 7.5 0.616219 6 0.117027C4.8 -0.282327 3.67 0.446494 3 1.6146C3 1.6146 2.44 2.22362 2 2.50317C1.31 2.94246 0 3.77151 0 3.77151V10.9998C3.48365 12.3261 2 8.5 11 11.5L10.9 3.54188ZM5.5 1.00559C6.38 1.20527 6.7 2.52353 6.92 3.33222C5.72 3.55186 4.46 3.53189 3.52 3.37215C3.63 2.0443 4.58 0.795928 5.5 1.00559ZM10 10.6005C7.88661 9.69257 4.78539 8.62894 1 10.6005C1.26 8.03461 1.18 6.64685 1 4.40049C1.7 4.16088 2.5 3.13149 3 4.12987C3.97327 4.84087 6.25806 4.35137 7.63 4.15983C9 3.54188 9.11 4.18084 10 4.40049C9.65 4.62013 9.58 7.9148 10 10.6005Z"
  // "M11.8994 2.65963C11.6288 2.70829 9 2.27829 9 2.27829C9 2.27829 8.49992 0.999783 7 0.499785C6.07029 0.402579 4.51981 0.416077 3.92984 1.41608C3.92984 1.41608 3.33928 1.99829 2.89931 2.27829C2.20934 2.71829 0.899414 2.93829 0.899414 2.93829V7.72307C5.15843 12.3339 10.7675 9.31993 12 7.91389L11.8994 2.65963ZM6.5 0.999785C7.37995 1.19978 7.59905 2.0488 7.81904 2.8588C6.45792 2.96658 5.23047 2.93244 4.41922 2.8988C4.52922 1.5688 5.58005 0.789786 6.5 0.999785ZM11 6.99979C7.70846 11.4139 2.22529 8.55435 1.78852 7.39345C1.78852 7.39345 2.17999 5.74977 2 3.49979C2 2.99979 3 2.99979 3 2.99979C5.04198 4.55462 8.07819 3.74318 9.32475 2.8988C9.32475 2.8988 10.5 2.99987 11 3.49979C11 3.49979 11.5 4.70896 11 6.99979Z"

  // "M13.9993 2.92599C10.0898 3.00167 10.0015 3.06473 10.0898 3.00167C9.45916 0.643214 8.21056 0 6.94935 0H6.91151C5.7512 0 4.54043 0.290077 3.90983 3.00167C2.64862 3.00167 -0.0125418 2.73681 7.02739e-05 2.92599C0.127593 6.06107 0.065568 7.60123 0 10.0896C0.844979 11.6043 14.1397 11.3675 13.9993 9.93829C13.8361 7.24159 13.9344 5.98207 13.9993 2.92599ZM6.93669 0.630602C8.19791 0.630602 8.67721 1.90442 8.95468 2.92599C7.42025 4.18544 6.39611 4.17983 5.17104 3.00167C5.30977 1.32426 5.67548 0.630602 6.93669 0.630602ZM13 9C8.03533 11.1059 5.97726 11.0964 0.999955 9C0.987466 9.00012 0.796682 6.3248 0.999955 3.65134L3.92244 3.63227L3.92244 4.24214L5.17104 4.10341L5 4C5.83821 4.695 8.0183 4.97231 9 4L8.82856 4.11602L10.0898 4.21692L10.1654 3.63227C10.9096 3.63227 12.0036 3.65134 13 3.65134C13.1936 5.8314 13.1915 7.00147 13 9Z",

  // "M11.9928 3.5219C8.64355 3.58481 8.64355 3.58481 8.64355 3.58481C8.24365 0.999847 6.11462 0.500109 5.99994 0.5C5.48471 0.49951 3.8896 1.33055 3.34938 3.58481C2.26893 3.58481 0 3.5219 0 3.5219C0.109245 6.12824 0.0561702 8.25624 0 10.325C0.213347 11.0099 12.3627 11.2087 11.9928 10.4283C11.9928 10.4283 11.9372 6.06256 11.9928 3.5219ZM5.99994 1.49992C7.08038 1.49992 7.43346 2.67262 7.67115 3.5219L6.05049 3.55336L4.42982 3.58481C4.54867 2.19031 5.48471 1.49992 5.99994 1.49992ZM11.1367 9C9.07855 10.2328 3.01569 10.2162 0.856632 9C0.845934 9.0001 0.682435 6.67719 0.856572 4.45463V4.4467L3.36018 4.43877L3.36018 5.11469L4.42982 4.99936L4.36499 4.43877H7.61713L7.56311 5.00984L8.64355 5.09372L8.70838 4.43877L11.1367 4.45463C11.3025 6.26701 11.3008 7.33853 11.1367 9Z"

  "M11.9928 3.02198C8.64361 3.08489 8.64361 3.08489 8.64361 3.08489C8.24371 0.499924 7 0.000153434 6 7.67168e-05C5 0 3.88966 0.830625 3.34944 3.08489C2.26899 3.08489 6.02016e-05 3.02198 6.02016e-05 3.02198C0.109305 5.62831 0.0561702 7.32782 0 9.39654C0.19967 10.1635 12.331 10.3423 11.9928 9.49985C11.9928 9.49985 11.9372 5.56263 11.9928 3.02198ZM6 0.5C7.08044 0.5 7.43352 2.1727 7.67121 3.02198L6.05055 3.05344L4.42988 3.08489C4.54873 1.69039 5.48477 0.5 6 0.5ZM11.1367 8.64269C6 9.64269 6 9.5 0.856632 8.64269C0.856632 8.64269 0.682495 6.17727 0.856632 3.9547V3.94677L3.36024 3.93884H4.36505H7.61719L8.75994 3.93918L8.70844 3.93884L11.1367 3.9547C11.3026 5.76708 11.3008 6.98122 11.1367 8.64269Z",
]

const cartPathsClosed = [
  // "M0 11L0.000975034 9.66532L0 3L1.66962 3L1.66962 9.70061C3.11032 9.70061 7.13728 7.84617 9.09913 7.84617L10.5621 7.84617L10.5621 3.5L12 3.5L12 10.3818L10.3304 9.03795C10.0661 8.60914 7.96391 8.40122 1.66962 11L0 11Z",
  // "M11 4C11 4 8.70792 1.41864 6.95074 1.14285C5.38545 0.897185 3 2.28571 3 2.28571C3 2.28571 3.9333 0 6.54543 0C9.15755 0 11 4 11 4Z",
  // "M12 4C12 4 8.8 3.1257 4.8 3.1257C4.8 3.1257 1.6 3.1257 0 3.34972C0 1.8141 2.4 1.81408 5.6 2.25135C10.3794 2.90445 12 4 12 4Z",

  // "M11 7.26462C11 7.26462 7.667 8 5.5 8C3.333 8 0 7.26462 0 7.26462V3H2C2 3 2.61699 3.49223 5.5 3.49223C8.38301 3.49223 9 3 9 3H11V7.26462Z",
  // "M9 2.85714C9 2.85714 7 0 5.5 0C4 0 3.36683 1.74136 2 2.85714V5H3.27273C3.27273 5 4.33099 2.14286 5.5 2.14286C6.66901 2.14286 7.72727 5 7.72727 5H9V2.85714Z"

  // "M11 10.6763C11 10.6763 7.667 12 5.5 12C3.333 12 0 10.6763 0 10.6763V3H2C2 3 2.61699 3.88601 5.5 3.88601C8.38301 3.88601 9 3 9 3H11V10.6763Z",
  // "M9 2.85714C9 2.85714 7 0 5.5 0C4 0 3.36683 1.74136 2 2.85714V5H3.27273C3.27273 5 4.33099 2.14286 5.5 2.14286C6.66901 2.14286 7.72727 5 7.72727 5H9V2.85714Z"

  // "M11 10.6763C11 10.6763 7.667 12 5.5 12C3.333 12 0 10.6763 0 10.6763V3H2C2 3 2.61699 3.88601 5.5 3.88601C8.38301 3.88601 9 3 9 3H11V10.6763Z",
  // "M9 2.85714C9 2.85714 7 0 5.5 0C4 0 3.36683 1.74136 2 2.85714V5H3.27273C3.27273 5 4.33099 2.14286 5.5 2.14286C6.66901 2.14286 7.72727 5 7.72727 5H9V2.85714Z"

  // "M0 10.6746L0.000975034 9.33988L0 2.67456L1.66962 2.67456L1.5 9.53174C2.43911 11.5908 9.87266 11.3901 10.3304 9.53174C10.3304 9.1883 10.5621 7.52073 10.5621 7.52073L10.5621 3.17456L12 3.17456L12 10.5317L10.5 11.1455C7.04054 12.7568 5.10706 12.83 1.66962 11.2884L0 10.6746Z",
  // "M0 2.03177L0.000975034 3.36646L1.66962 3.36642V3.33116L8.79605 3.33116C10.599 3.33116 10.5621 3.36642 10.5621 3.36642L12 3.36642L12 2.03177L10 2.03177L1.66962 2.03177L0 2.03177Z",
  // "M2.0364 0.0286439L2.03137 1.0291L2.00488 2.56006L3.3991 2.57323L3.42516 1.02903L6 1.07227L8.58798 1.07227L8.58806 2.57323L9.92 2.62376L9.94917 0.082278L8.28425 0.0822778C8.28425 0.0822778 6.91999 0.11499 6 0.0822777C4.97389 0.0457924 3.42513 0.0317384 3.42513 0.0317384L2.0364 0.0286439Z",

  // "M3 10.1509L3.00098 8.8162L3 2.15088L4.66962 2.15088C4.66962 2.15088 4 3.47632 4.5 7.97632C5 12.4763 12.9928 11.814 13.5 7.97632C13.5 7.63288 13.5621 6.99705 13.5621 6.99705L13.5621 2.65088L15 2.65088L15 10.0081L13.5 10.6218C10.0405 12.2331 8.10706 12.3064 4.66962 10.7647L3 10.1509Z",
  // "M3 1.47635L3.00098 2.81104L3.82422 2.81104L4.66962 2.77574L11.796 2.77574C13.599 2.77574 13.5621 2.811 13.5621 2.811L15 2.811L15 1.47635L13 1.47635L4.66962 1.47635L3 1.47635Z",
  // "M5.02477 0.0214587L5.0224 0.765512L5 1.90405L6.39422 1.91756L6.41615 0.769173L8.99104 0.808192L11.5789 0.81509L11.583 1.93139L12.9151 1.97253L12.9375 0.0824391L11.2726 0.0780012C11.2726 0.0780012 9.90846 0.0986936 8.9884 0.0719125C7.96222 0.0420422 6.41347 0.0274619 6.41347 0.0274619L5.02477 0.0214587Z",
  // "M7 8.5C7 10.433 5.433 12 3.5 12C1.567 12 0 10.433 0 8.5C0 6.567 1.567 5 3.5 5C5.433 5 7 6.567 7 8.5Z",
  // "M3.5 9.96826C3.19137 9.96732 2.92478 9.90682 2.70023 9.78674C2.47567 9.66667 2.30256 9.49359 2.18088 9.26751C2.0592 9.04143 1.99891 8.77033 2.00001 8.45419C2.00112 8.13712 2.06196 7.86789 2.18254 7.6465C2.30422 7.42511 2.47678 7.25672 2.70023 7.14134C2.92478 7.02595 3.19137 6.96826 3.5 6.96826C3.80863 6.96826 4.07522 7.02642 4.29977 7.14275C4.52433 7.25813 4.69744 7.42652 4.81912 7.64791C4.9408 7.86929 5.00109 8.13806 4.99999 8.45419C4.99999 8.7722 4.93915 9.04425 4.81746 9.27033C4.69578 9.4964 4.52267 9.66948 4.29811 9.78956C4.07466 9.90869 3.80863 9.96826 3.5 9.96826ZM3.5 9.33224C3.65929 9.33224 3.78982 9.26188 3.89159 9.12117C3.99446 8.97952 4.04535 8.75719 4.04424 8.45419C4.04424 8.25625 4.02101 8.09443 3.97455 7.96873C3.92809 7.84303 3.86393 7.75016 3.78208 7.69012C3.70022 7.62914 3.60619 7.59866 3.5 7.59866C3.34071 7.59866 3.21073 7.66714 3.11007 7.8041C3.00941 7.94106 2.95797 8.15776 2.95576 8.45419C2.95465 8.65588 2.97733 8.82192 3.02379 8.95231C3.07025 9.08177 3.13441 9.17746 3.21626 9.23937C3.29923 9.30128 3.39381 9.33224 3.5 9.33224Z",

  // "M0 10.1509L0.000975034 8.8162L0 2.15088L1.66962 2.15088C1.66962 2.15088 1 3.47632 1.5 7.97632C2 12.4763 9.9928 11.814 10.5 7.97632C10.5 7.63288 10.5621 6.99705 10.5621 6.99705L10.5621 2.65088L12 2.65088L12 10.0081L10.5 10.6218C7.04054 12.2331 5.10706 12.3064 1.66962 10.7647L0 10.1509Z",
  // "M0 1.47635L0.000975034 2.81104L0.824219 2.81104L1.66962 2.77574L8.79605 2.77574C10.599 2.77574 10.5621 2.811 10.5621 2.811L12 2.811L12 1.47635L10 1.47635L1.66962 1.47635L0 1.47635Z",
  // "M2.02477 0.0214587L2.0224 0.765512L2 1.90405L3.39422 1.91756L3.41615 0.769173L5.99104 0.808192L8.57895 0.81509L8.58303 1.93139L9.91507 1.97253L9.93747 0.0824391L8.27259 0.0780012C8.27259 0.0780012 6.90846 0.0986936 5.9884 0.0719125C4.96222 0.0420422 3.41347 0.0274619 3.41347 0.0274619L2.02477 0.0214587Z",

  // "M0 11.151L0.000975034 9.8163L0 3.15098L1.63793 3.15098C1.65737 3.02329 1.66962 3.15098 1.66962 3.15098H1.63793C1.60457 3.37009 1.55005 4.34122 1.5 8.0001C1.42078 13.7911 10.5065 13.1781 10.5621 8.0001C10.6177 2.82209 10.6242 3.15098 10.6242 3.15098L12 3.65098L12 11.0082L10.5 11.622C7.04054 13.2332 5.10706 13.3065 1.66962 11.7648L0 11.151Z",
  // "M0 2.4766L0.000975034 3.81128L0.824219 3.81128L1.66962 3.77599L8.79605 3.77599C10.599 3.77599 10.5621 3.81124 10.5621 3.81124L12 3.81124L12 2.4766L10 2.4766L1.66962 2.4766L0 2.4766Z",
  // "M2.03242 0.542642L2.02703 1.57732L2 3.16064L3.39422 3.17377L3.42082 1.57675L5.99566 1.62055L8.58365 1.61963L8.5832 3.17192L9.91513 3.22371L9.9452 0.595296L8.28028 0.595888C8.28028 0.595888 6.916 0.630204 5.99601 0.596701C4.96991 0.559332 3.42115 0.545349 3.42115 0.545349L2.03242 0.542642Z",

  // "M0 12.1503L0.000975034 10.8156L0 4.15025L1.63793 4.15025C1.65737 4.02256 1.66962 4.15025 1.66962 4.15025H1.63793C1.60457 4.36936 1.55005 5.34049 1.5 8.99936C1.42078 14.7904 10.5065 14.1774 10.5621 8.99936C10.6177 3.82136 10.6242 4.15025 10.6242 4.15025L12 4.65025L12 12.0074L10.5 12.6212C7.04054 14.2325 5.10706 14.3057 1.66962 12.764L0 12.1503Z",
  // "M0 3.47562L0.000975034 4.8103L0.824219 4.8103L1.66962 4.77501L8.79605 4.77501C10.599 4.77501 10.5621 4.81027 10.5621 4.81027L12 4.81027L12 3.47562L10 3.47562L1.66962 3.47562L0 3.47562Z",
  // "M2.03242 1.54191L2.02703 2.57659L2 4.15991L3.39422 4.17303L3.42082 2.57602L6 2L8.58365 2.61889L8.5832 4.17119L9.91513 4.22298L9.9452 1.59456L8.28028 1.59516L6 0.5L3.70436 1.59456L2.03242 1.54191Z",

  // "M11.5078 8.544C11.5078 8.544 8.34755 10.92 6.00781 10.92C3.66807 10.92 0.507812 8.544 0.507812 8.544V3H2.50781C2.50781 3 3.1248 4 6.00781 4C8.89082 4 9.50781 3 9.50781 3H11.5078V8.544Z",
  // "M10.5078 2.28571L6.00781 0L1.50781 2.28571V4H3.14418C3.14418 4 4.50479 1.71429 6.00781 1.71429C7.51083 1.71429 8.87145 4 8.87145 4H10.5078V2.28571Z",

  // "M0 12L0.000975034 10.6653L0 4L1.66962 4L1.66962 10.7006L8.79605 10.7006C10.599 10.7006 10.5621 8.84617 10.5621 8.84617L10.5621 4.5L12 4.5L12 11.3818L10.3304 11.3818C10.0661 10.953 8.5 11.5 1.66962 12L0 12Z",
  // "M11 5.0001C11 5.0001 8.75718 1.77578 7 1.5C5.4347 1.25433 3 3.28581 3 3.28581C3 3.28581 3.98256 0.357146 6.59469 0.357146C9.20681 0.357146 11 5.0001 11 5.0001Z",
  // "M12 5C12 5 8.8 4.1257 4.8 4.1257C4.8 4.1257 1.6 4.1257 0 4.34972C0 2.8141 2.4 2.81408 5.6 3.25135C10.3794 3.90445 12 5 12 5Z",

  // "M0 10.394C3.6 13.194 8.83333 11.5606 11 10.394V3.15755C10.8333 3.15756 9.6 2.11027 8 2.11027C7.5 1.11027 7.5 0.610078 6 0.110078C4.8 -0.289922 3.66667 0.443466 3 1.61013L0 3.15755V10.394Z",
  // "M7 3.00032L3.5 2.9999C3.5 1.49992 4.52077 0.772781 5.5 1C6.47923 1.22702 6.7647 2.07905 7 3.00032Z",
  // "M1 10C1.25873 7.42944 1.17645 6.04344 1 3.79082C4.15945 2.6934 6 2.78028 10 3.79082C9.65144 4.01468 9.57914 7.30552 10 10C6.46457 11.8277 3.26257 10.6488 1 10Z",
  // "M8.35602 2.32344C6.36032 3.1306 3.11832 2.78159 2 2.32344C2.79323 4.80107 7.44841 3.59553 8.35597 2.84435C9.59179 2.0528 8.57343 2.23551 8.35602 2.32344Z",

  // "M10.9 2.93037C10.73 2.93037 7.9 1.88037 7.9 1.88037C7.9 1.88037 7.5 0.610369 6 0.110369C4.8 -0.289631 3.67 0.440369 3 1.61037C3 1.61037 2.44 2.22037 2 2.50037C1.31 2.94037 0 3.16037 0 3.16037V10.4004C3.6 13.2004 8.83 11.5704 11 10.4004L10.9 2.93037ZM5.5 1.00037C6.38 1.20037 6.7 1.91037 6.92 2.72037C5.72 2.94037 4.46 2.92037 3.52 2.76037C3.63 1.43037 4.58 0.790369 5.5 1.00037ZM10 10.0004C6.46 11.8304 3.26 10.6504 1 10.0004C1.26 7.43037 1.18 6.04037 1 3.79037C1.7 3.55037 2.33 3.37037 2.93 3.24037C4 4.37037 6.34 3.85037 7.63 3.27037C8.34 3.40037 9.11 3.57037 10 3.79037C9.65 4.01037 9.58 7.31037 10 10.0004Z"

  // "M11.8994 2.65985C11.6288 2.70851 9 2.27851 9 2.27851C9 2.27851 8.49992 0.999998 7 0.5C6.07029 0.402793 4.51981 0.416292 3.92984 1.4163C3.92984 1.4163 3.33928 1.99851 2.89931 2.27851C2.20934 2.71851 0.899414 2.93851 0.899414 2.93851V7.72328C6.93074 10.3155 12 7.91411 12 7.91411L11.8994 2.65985ZM6.5 1C7.37995 1.2 7.59905 2.04902 7.81904 2.85901C6.45792 2.96679 5.23047 2.93266 4.41922 2.89901C4.52922 1.56902 5.58005 0.790001 6.5 1ZM11 7C7.2076 9.61635 1.80385 7.06858 1.78852 7.39367C1.78852 7.39367 2.17999 5.74999 2 3.5C2 3 3 3 3 3C5 4 8.04176 3.25971 9.32475 2.89901C9.32475 2.89901 10.5 3.00008 11 3.5C11 3.5 11.5 4.70918 11 7Z"

  // "M13.9993 2.92599C10.0898 3.00167 10.0015 3.06473 10.0898 3.00167C9.45916 0.643214 8.21056 0 6.94935 0H6.91151C5.7512 0 4.54043 0.290077 3.90983 3.00167C2.64862 3.00167 -0.0125418 2.73681 7.02739e-05 2.92599C0.127593 6.06107 0.065568 7.60123 0 10.0896C0.882621 10.628 14.2047 10.4442 13.9993 9.93829C13.8361 7.24159 13.9344 5.98207 13.9993 2.92599ZM6.93669 0.630602C8.19791 0.630602 8.67721 1.90442 8.95468 2.92599C7.4207 3.17015 6.39655 3.16388 5.17104 3.00167C5.30977 1.32426 5.67548 0.630602 6.93669 0.630602ZM13 9C8.08858 9.8715 6.03151 9.85179 0.999955 9C0.987466 9.00012 0.796682 6.3248 0.999955 3.65134L3.92244 3.63227L3.92244 4.24214L5.17104 4.10341L5.09537 3.63227H8.89162L8.82856 4.11602L10.0898 4.21692L10.1654 3.63227C10.9096 3.63227 12.0036 3.65134 13 3.65134C13.1936 5.8314 13.1915 7.00147 13 9Z",

  // "M11.9928 2.52206C8.64361 2.58497 8.64361 2.58497 8.64361 2.58497C8.24371 4.76837e-07 6.29746 0.000109581 6.18278 5.42027e-07C5.66755 -0.000489345 3.88966 0.330701 3.34944 2.58497C2.26899 2.58497 6.02016e-05 2.52206 6.02016e-05 2.52206C0.109305 5.12839 0.0561702 6.82789 0 8.89661C0.237615 8.69425 12.3365 8.91191 11.9928 8.99992C11.9928 8.99992 11.9372 5.06271 11.9928 2.52206ZM6.18278 0.999924C7.26322 0.999924 7.43352 1.67278 7.67121 2.52206L6.05055 2.55351L4.42988 2.58497C4.54873 1.19047 5.66755 0.999924 6.18278 0.999924ZM11.1367 7.57166C6.18278 7.99951 6.18278 7.99951 0.856632 7.57166C0.845934 7.57176 0.682495 5.67734 0.856632 3.45478V3.44685L3.36024 3.43892L3.36024 4.11485L4.42988 3.99951L4.36505 3.43892H7.61719L7.56317 4.01L8.64361 4.09388L8.70844 3.43892L11.1367 3.45478C11.3026 5.26716 11.3008 5.91019 11.1367 7.57166Z",

  // "M11.9928 2.52206C8.64361 2.58497 8.64361 2.58497 8.64361 2.58497C8.24371 4.76837e-07 6.29746 0.000109581 6.18278 5.42027e-07C5.66755 -0.000489345 3.88966 0.330701 3.34944 2.58497C2.26899 2.58497 6.02016e-05 2.52206 6.02016e-05 2.52206C0.109305 5.12839 0.0561702 6.82789 0 8.89661C0.237615 8.69425 12.3365 8.91191 11.9928 8.99992C11.9928 8.99992 11.9372 5.06271 11.9928 2.52206ZM6.18278 0.999924C7.26322 0.999924 7.43352 1.67278 7.67121 2.52206L6.05055 2.55351L4.42988 2.58497C4.54873 1.19047 5.66755 0.999924 6.18278 0.999924ZM11.1367 7.57166C6.18278 7.99951 6.18278 7.99951 0.856632 7.57166C0.845934 7.57176 0.682495 5.67734 0.856632 3.45478V3.44685L3.36024 3.43892L3.36024 4.61533L4.42988 4.5L4.36505 3.43892H7.61719L7.56317 4.51048L8.64361 4.59436L8.70844 3.43892L11.1367 3.45478C11.3026 5.26716 11.3008 5.91019 11.1367 7.57166Z",

  // "M11.9928 2.52206C8.64361 2.58497 8.64361 2.58497 8.64361 2.58497C8.24371 4.76837e-07 6.29746 0.000109581 6.18278 5.42027e-07C5.66755 -0.000489345 3.88966 0.330701 3.34944 2.58497C2.26899 2.58497 6.02016e-05 2.52206 6.02016e-05 2.52206C0.109305 5.12839 0.0561702 6.82789 0 8.89661C0.237615 8.69425 12.3365 8.91191 11.9928 8.99992C11.9928 8.99992 11.9372 5.06271 11.9928 2.52206ZM6.18278 0.999924C7.26322 0.999924 7.43352 1.67278 7.67121 2.52206L6.05055 2.55351L4.42988 2.58497C4.54873 1.19047 5.66755 0.999924 6.18278 0.999924ZM11.1367 7.57166C6.18278 7.99951 6.18278 7.99951 0.856632 7.57166C0.845934 7.57176 0.682495 5.67734 0.856632 3.45478V3.44685L3.36024 3.43892H4.36505H7.61719L8.75995 3.43926L8.70844 3.43892L11.1367 3.45478C11.3026 5.26716 11.3008 5.91019 11.1367 7.57166Z",

  // "M11.9928 2.52206C8.64361 2.58497 8.64361 2.58497 8.64361 2.58497C8.24371 4.76837e-07 6.29746 0.000109581 6.18278 5.42027e-07C5.66755 -0.000489345 3.88966 0.330701 3.34944 2.58497C2.26899 2.58497 6.02016e-05 2.52206 6.02016e-05 2.52206C0.109305 5.12839 0.0561702 6.82789 0 8.89661C0.237615 8.69425 12.3365 8.91191 11.9928 8.99992C11.9928 8.99992 11.9372 5.06271 11.9928 2.52206ZM6.18278 0.999924C7.26322 0.999924 7.43352 1.67278 7.67121 2.52206L6.05055 2.55351L4.42988 2.58497C4.54873 1.19047 5.66755 0.999924 6.18278 0.999924ZM11.1367 8C6.18278 8.19556 5.5 8 0.856631 8C0.845932 8.0001 0.682495 5.67734 0.856632 3.45478V3.44685L3.36024 3.43892L3.36024 4.11485L4.42988 3.99951L4.36505 3.43892H7.61719L7.56317 4.01L8.64361 4.09388L8.70844 3.43892L11.1367 3.45478C11.3026 5.26716 11.3008 6.33853 11.1367 8Z"


  "M11.9928 2.52206C8.64361 2.58497 8.64361 2.58497 8.64361 2.58497C8.24371 4.76837e-07 6.29746 0.000109581 6.18278 5.42027e-07C5.66755 -0.000489345 3.88966 0.330701 3.34944 2.58497C2.26899 2.58497 6.02016e-05 2.52206 6.02016e-05 2.52206C0.109305 5.12839 0.0561702 6.82789 0 8.89661C0.237615 8.69425 12.3365 8.91191 11.9928 8.99992C11.9928 8.99992 11.9372 5.06271 11.9928 2.52206ZM6.18278 0.999924C7.26322 0.999924 7.43352 1.67278 7.67121 2.52206L6.05055 2.55351L4.42988 2.58497C4.54873 1.19047 5.66755 0.999924 6.18278 0.999924ZM11.1367 7.89439C9.98323 8.15696 1.94692 8.14021 0.856632 7.89439C0.845934 7.89449 0.682495 5.67734 0.856632 3.45478V3.44685L3.36024 3.43892H4.36505H7.61719L8.75995 3.43926L8.70844 3.43892L11.1367 3.45478C11.3026 5.26716 11.3008 6.23292 11.1367 7.89439Z",


]

const navPathsOpen = [
  // "M1.2798 0.256182L7.25606 4.44859L7.75707 6.23425L4.70698 4.10835L1.6569 1.98246L1.11459 0.393028L1.2798 0.256182Z",
  // "M0.127537 2.41287L7.42766 2.40069L8.86525 3.57239L5.14744 3.58988L1.42963 3.60736L0.0712168 2.61988L0.127537 2.41287Z",

  // "M2.27901 0.828141L10.2561 7.02134L10.7571 8.807L7.70698 6.68111L2.65611 2.55442L2.11379 0.964988L2.27901 0.828141Z",
  // "M0.127564 4.2035L10.0624 4.19121L11.5 5.36292L5.14747 5.3805L1.42966 5.39798L0.0712434 4.41051L0.127564 4.2035Z",

  // "M10.6186 2.04475C10.6186 2.04475 6.73948 5.84835 0.361435 6.02177L1.0458 5.07179C1.69237 4.41704 7.62608 4.36544 9.37888 1.33072L10.6186 2.04475Z",
  // "M10.3659 7.44313C10.3659 7.44313 5.09611 6.12235 1.61636 0.774373L2.78392 0.861661C3.68 1.07096 6.82374 6.10369 10.3271 6.01297L10.3659 7.44313Z",

  // "M10.0631 0.972996C10.0631 0.972996 6.77273 5.29607 0.486301 6.38711L1.02657 5.34839C1.57201 4.60727 7.43629 3.70084 8.73332 0.445142L10.0631 0.972996Z",
  // "M11.1093 7.18657C11.1093 7.18657 5.70417 6.63925 1.48982 1.84876L2.65778 1.76682C3.57466 1.84476 7.41106 6.37173 10.8648 5.77694L11.1093 7.18657Z",

  // "M10.0631 0.972996C10.0631 0.972996 6.77273 5.29607 0.486301 6.38711L1.02657 5.34839C1.57201 4.60727 7.43629 3.70084 8.73332 0.445142L10.0631 0.972996Z",
  // "M12.1093 6.18657C12.1093 6.18657 6.70417 5.63925 2.48982 0.848759L3.65778 0.766824C4.57466 0.844759 8.41106 5.37173 11.8648 4.77694L12.1093 6.18657Z",

  // "M10.0631 1.973C10.0631 1.973 6.77273 6.29607 0.486301 7.38711L1.02657 6.34839C1.57201 5.60727 7.43629 4.70084 8.73332 1.44514L10.0631 1.973Z",
  // "M12.1079 7.18712C12.1079 7.18712 5.71435 4.79047 1.5 -1.91955e-05L2.4896 -0.000286911C3.40648 0.0776478 8.40967 6.37229 11.8634 5.77749L12.1079 7.18712Z",

  // "M11.5712 1.39953C7.24296 3.72185 5.50978 4.72129 1.18439 7.39635C0.888775 6.90306 0.938286 6.98657 0.522151 6.24834C5.009 4.0335 6.74105 3.0335 10.8212 0.10049L11.4402 1.17258L11.5712 1.39953Z",
  // "M10.8212 7.39972C6.64588 4.81253 4.91375 3.81127 0.434389 1.4029C0.713782 0.900249 0.666211 0.984884 1.09747 0.255386C5.25901 3.03369 6.99106 4.03369 11.5712 6.10068L10.9522 7.17277L10.8212 7.39972Z",


  // "M1.71647 0.000237861C5.64713 3.13872 7.28714 4.27217 11.6729 6.68649C11.3601 7.16906 11.1348 7.50313 10.6552 8.20175C6.97249 4.84396 4.47043 3.20338 0.601387 1.66054L1.29155 0.632827L1.71647 0.000237861Z",
  // "M0.165103 6.20252C4.6964 4.01906 6.42835 3.0318 10.5041 0.124487C10.8035 0.615437 11.0071 0.963162 11.429 1.6981C6.80744 3.56306 4.24502 5.10767 1.17861 7.92671L0.55123 6.85951L0.165103 6.20252Z",


  "M10.5638 8.35035C6.63315 5.21187 4.99314 4.07842 0.607376 1.6641C0.92017 1.18152 1.14542 0.847451 1.6251 0.148835C5.30778 3.50663 7.80985 5.14721 11.6789 6.69005L10.9887 7.71776L10.5638 8.35035Z",
  "M0.165103 6.20252C4.6964 4.01906 6.42835 3.0318 10.5041 0.124487C10.8035 0.615437 11.0071 0.963162 11.429 1.6981C6.80744 3.56306 4.24502 5.10767 1.17861 7.92671L0.55123 6.85951L0.165103 6.20252Z",



  // "M10.5638 8.35035C6.63315 5.21187 4.99314 4.07842 0.607376 1.6641C0.92017 1.18152 1.14542 0.847451 1.6251 0.148835C5.30778 3.50663 7.80985 5.14721 11.6789 6.69005L10.9887 7.71776L10.5638 8.35035Z",
  // "M11.5234 1.84533C6.99208 4.02879 5.26013 5.01605 1.18442 7.92336C0.884941 7.43241 0.681395 7.08469 0.259472 6.34975C4.88104 4.48479 7.44346 2.94019 10.5099 0.121146L11.1372 1.18834L11.5234 1.84533Z",





  // "M97.3409 2.0926C51.3201 -5.79643 8.31196 21.3221 1.21489 62.723C-5.88219 104.124 25.6384 144.018 71.6592 151.907C117.68 159.796 160.688 132.678 167.785 91.277C174.882 49.8761 143.362 9.98163 97.3409 2.0926ZM96.7887 5.31368C138.111 12.3973 165.73 51.9556 159.241 89.8123C152.751 127.669 113.534 155.77 72.2114 148.686C30.8889 141.603 3.28342 101.964 9.75924 64.1877C16.235 26.4109 55.5766 -1.75104 96.7887 5.31368Z",
  // "M72.8901 43.5343L105.32 95.1374L103.407 110.496L86.8116 84.2655L70.2158 58.0348L71.1773 44.0519L72.8901 43.5343Z",
  // "M47.0683 63.4624L108.016 63.3608L120.018 73.1328L88.9787 73.2786L57.9392 73.4244L46.5981 65.1888L47.0683 63.4624Z",

  // "M109.341 14.2769C63.3201 6.3879 20.312 33.5064 13.2149 74.9073C6.11781 116.308 37.6384 156.203 83.6592 164.092C129.68 171.981 172.688 144.862 179.785 103.461C186.882 62.0604 155.362 22.166 109.341 14.2769ZM108.789 17.498C150.111 24.5816 177.73 64.1399 171.241 101.997C164.751 139.853 125.534 167.954 84.2114 160.871C42.8889 153.787 15.2834 114.149 21.7592 76.372C28.235 38.5952 67.5766 10.4333 108.789 17.498Z",
  // "M84.8901 55.7186L117.32 107.322L115.407 122.68L98.8116 96.4498L82.2158 70.2192L83.1773 56.2362L84.8901 55.7186Z",
  // "M59.0683 75.6467L120.016 75.5451L132.018 85.3171L100.979 85.4629L69.9392 85.6087L58.5981 77.3732L59.0683 75.6467Z",

  // "M72.8933 3.3061C39.6723 -2.38875 8.35023 18.7962 2.88628 50.6702C-2.57766 82.5442 19.9003 112.952 53.1212 118.647C86.3422 124.341 117.664 103.156 123.128 71.2824C128.592 39.4084 106.114 9.00094 72.8933 3.3061ZM72.4681 5.78597C102.298 10.8994 121.956 41.0797 116.96 70.2251C111.964 99.3705 83.3757 121.28 53.5463 116.167C23.717 111.053 4.06854 80.8113 9.05418 51.7275C14.0398 22.6437 42.7184 0.686163 72.4681 5.78597Z",
  // "M51.8901 27.7186L84.3204 79.3218L82.4074 94.6804L65.8116 68.4498L49.2158 42.2192L50.1773 28.2362L51.8901 27.7186Z",
  // "M26.0683 47.6467L87.0158 47.5451L99.0181 57.3171L67.9787 57.4629L36.9392 57.6087L25.5981 49.3732L26.0683 47.6467Z",

  // "M42.7335 6.0894C11.1159 17.768 -5.41734 51.7757 5.78775 82.1114C16.9928 112.447 51.663 127.542 83.2807 115.863C114.898 104.185 131.432 70.1768 120.226 39.8412C109.021 9.50549 74.3511 -5.5892 42.7335 6.0894ZM43.6053 8.44958C71.995 -2.03673 104.11 14.2707 114.356 42.0094C124.602 69.7482 110.799 103.017 82.4089 113.503C54.0192 123.989 21.8822 107.623 11.658 79.9431C1.43375 52.2629 15.2913 18.9079 43.6053 8.44958Z",
  // "M36.7509 37.7328L90.6379 66.2073L96.6605 80.4648L69.1728 66.0463L41.6851 51.6278L35.5264 39.0375L36.7509 37.7328Z",
  // "M24.352 67.9021L77.0833 37.3403L92.3635 39.802L65.5555 55.448L38.7475 71.094L24.808 69.6324L24.352 67.9021Z",
]

const navPathsClosed = [
  // "M0.127537 4.9285L7.42766 4.91631L8.86525 6.08802L5.14744 6.1055L1.42963 6.12298L0.0712168 5.13551L0.127537 4.9285Z",
  // "M0.127537 0.412874L7.42766 0.400687L8.86525 1.57239L5.14744 1.58988L1.42963 1.60736L0.0712168 0.619881L0.127537 0.412874Z"

  // "M11 1.12722C11 1.12722 5.97667 3.19638 0 0.962796L0.990939 0.3392C1.83602 -0.0249382 7.35511 2.15476 10.119 0L11 1.12722Z",
  // "M11 5.12722C11 5.12722 5.97667 7.19638 0 4.9628L0.990939 4.3392C1.83602 3.97506 7.35511 6.15476 10.119 4L11 5.12722Z",

  "M12.0002 5.5C7.09068 5.34708 5.08998 5.34603 0.00655568 5.5C-0.00280888 4.92499 -0.00168903 5.02207 0.0070436 4.17468C5.00019 4.5 7.00019 4.5 12.0002 4L12.0002 5.23795L12.0002 5.5Z",
  "M12.0002 1.5C7.09068 1.34708 5.08998 1.34603 0.00655568 1.5C-0.00280888 0.924993 -0.00168903 1.02207 0.0070436 0.174681C5.00019 0.5 7.00019 0.5 12.0002 2.09818e-06L12.0002 1.23795L12.0002 1.5Z",


  // "M37.5 44C38.8814 44 40 45.3419 40 47C40 48.6581 38.8814 50 37.5 50C36.1186 50 35 48.6581 35 47C35 45.3419 36.1186 44 37.5 44ZM37.5 44.129C36.2596 44.129 35.2565 45.4839 35.2565 47C35.2565 48.5161 36.2596 49.871 37.5 49.871C38.7404 49.871 39.7435 48.5129 39.7435 47C39.7435 45.4871 38.7371 44.129 37.5 44.129Z",
  // "M0.995041 38.5837L61.9426 38.4821L73.9448 48.2541L42.9054 48.3999L11.866 48.5457L0.524831 40.3102L0.995041 38.5837Z",
  // "M0.995041 0.923338L61.9426 0.821703L73.9448 10.5937L42.9054 10.7395L11.866 10.8853L0.524831 2.64978L0.995041 0.923338Z",

  // "M96.1546 69.8064C93.5553 69.3608 91.1261 70.8926 90.7252 73.231C90.3244 75.5694 92.1047 77.8227 94.7041 78.2683C97.3034 78.7139 99.7326 77.1822 100.133 74.8438C100.534 72.5054 98.754 70.252 96.1546 69.8064ZM96.1234 69.9884C98.4574 70.3885 100.017 72.6228 99.6509 74.761C99.2843 76.8993 97.0692 78.4865 94.7353 78.0864C92.4013 77.6863 90.842 75.4474 91.2078 73.3137C91.5736 71.18 93.7957 69.5893 96.1234 69.9884Z",
  // "M63.1 97.2071L124.046 97.6548L135.96 107.535L104.92 107.401L73.8807 107.267L62.6143 98.9292L63.1 97.2071Z",
  // "M58.6943 69.4624L119.642 69.3608L131.644 79.1328L100.605 79.2786L69.5652 79.4244L58.2241 71.1888L58.6943 69.4624Z",

  // "M67.983 69.1269C67.5743 69.0568 67.1889 69.3175 67.1216 69.7096C67.0544 70.1018 67.331 70.476 67.7397 70.546C68.1485 70.6161 68.5339 70.3554 68.6011 69.9633C68.6684 69.5711 68.3918 69.1969 67.983 69.1269ZM67.9778 69.1574C68.3448 69.2203 68.5867 69.5916 68.5252 69.9502C68.4638 70.3089 68.112 70.5784 67.745 70.5155C67.3779 70.4526 67.1362 70.0805 67.1975 69.7226C67.2589 69.3648 67.6117 69.0946 67.9778 69.1574Z",
  // "M30.518 68.1439L91.4586 69.0666L103.295 79.0389L72.2574 78.6631L41.22 78.2872L30.0188 69.8622L30.518 68.1439Z",
  // "M26.0683 42.4624L87.0158 42.3608L99.0181 52.1328L67.9787 52.2786L36.9392 52.4244L25.5981 44.1888L26.0683 42.4624Z",
]

export const MenuToggle = ({ isCart, className }: ToggleProps) => {
  const { globalData, setGlobalData } = useGlobalContext()
  const isOpen = globalData.headerData.expanded
  const pathsOpen = isCart ? cartPathsOpen : navPathsOpen
  const pathsClosed = isCart ? cartPathsClosed : navPathsClosed

  const cartItemCount = globalData.shoppingCartData.items.length

  const springs = useSprings(
    pathsOpen.length,
    pathsOpen.map((_, index) => ({
      d: isOpen ? pathsOpen[index] : pathsClosed[index],
    }))
  )

  const handleToggle = () => {
    setGlobalData({
      ...globalData,
      headerData: {
        ...globalData.headerData,
        expanded: !isOpen,
      },
    })
  }

  return (
    <>
      <button
        aria-label={isCart ? "Toggle cart" : "Toggle navigation menu"}
        onClick={handleToggle}
        className={cn(className, "toggle:hidden group flex items-center")}
      >
        <span
          className={cn(
            "flex cursor-pointer rounded-xl bg-lunnheim-dark-olive bg-opacity-0 px-6 py-1 text-lunnheim-dark-olive transition-all duration-200 hover:bg-opacity-10 active:bg-opacity-20"
          )}
        >
          <Relative>
            {isCart && cartItemCount > 0 && (
              <Absolute className="-left-[8vw] top-2 h-4 w-4 rounded-full bg-lunnheim-pale-yellow  font-serif text-xxs font-semibold md:-left-[15px]">
                {cartItemCount}
              </Absolute>
            )}
          </Relative>
          <animated.svg
            width={isCart ? "25" : "22"}
            height="23"
            viewBox={isCart ? "0 0 16 9" : "0 0 17 6"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {springs.map((props, index) => (
              <animated.path key={index} {...props} fill="#474224" />
            ))}
          </animated.svg>
        </span>
      </button>
    </>
  )
}



