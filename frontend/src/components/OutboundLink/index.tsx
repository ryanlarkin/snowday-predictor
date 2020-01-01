import React from "react"
import PropTypes from "prop-types"
import { Button, ButtonProps } from "react-bootstrap"

/**
 * Button that tracks click in Google Analytics
 * @param props The properties to pass to the button
 */
const OutboundLink = (
  props: OutboundLinkProps & React.HTMLProps<HTMLButtonElement> & ButtonProps
) => (
  <Button
    {...(props as any)}
    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (typeof props.onClick === "function") {
        props.onClick(e)
      }

      var redirect = true

      if (
        e.button !== 0 ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.defaultPrevented
      ) {
        redirect = false
      }

      if (props.target && props.target.toLowerCase() !== "_self") {
        redirect = false
      }

      if ((window as any).gtag) {
        ;(window as any).gtag("event", "click", {
          event_category: "outbound",
          event_label: props.href,
          transport_type: redirect ? "beacon" : "",
          event_callback: function event_callback() {
            if (redirect && props.href) {
              document.location.href = props.href
            }
          },
        })
      } else {
        if (redirect && props.href) {
          document.location.href = props.href
        }
      }

      return false
    }}
  />
)

OutboundLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
}

/**
 * Properties for OutboundLink component
 */
interface OutboundLinkProps {
  /**
   * What to do when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export { OutboundLink }
