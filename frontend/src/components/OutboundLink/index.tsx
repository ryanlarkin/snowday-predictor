import React from "react"
import PropTypes from "prop-types"
import { Button, ButtonProps } from "react-bootstrap"

const createFunctionWithTimeout = (
  callback: () => void,
  opt_timeout = 1000
) => {
  let called = false
  const raceCallback = () => {
    if (!called) {
      called = true
      callback()
    }
  }
  setTimeout(raceCallback, opt_timeout)
  return raceCallback
}

const OutboundLink = (
  props: OutboundLinkProps & React.HTMLProps<HTMLButtonElement> & ButtonProps
) => (
  <Button
    {...(props as any)}
    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (typeof props.onClick === `function`) {
        props.onClick(e)
      }
      let redirect = true
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
      if (props.target && props.target.toLowerCase() !== `_self`) {
        redirect = false
      }
      if ((window as any).ga) {
        ;(window as any).ga(`send`, `event`, {
          eventCategory: `Outbound Link`,
          eventAction: `click`,
          eventLabel: props.href,
          transport: redirect ? `beacon` : ``,
          hitCallback: function() {
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
 * This allows the user to create custom events within their Gatsby projects.
 *
 * @param {import('gatsby-plugin-google-analytics').CustomEventArgs} args
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#events
 */
function trackCustomEvent({
  category,
  action,
  label,
  value,
  nonInteraction = true,
  transport,
  hitCallback,
  callbackTimeout = 1000,
}: CustomEventArgs): void {
  if (typeof window !== `undefined` && (window as any).ga) {
    const trackingEventOptions = {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      nonInteraction: nonInteraction,
      transport,
      hitCallback: () => {},
    }

    if (hitCallback && typeof hitCallback === `function`) {
      trackingEventOptions.hitCallback = createFunctionWithTimeout(
        hitCallback as () => void,
        callbackTimeout
      )
    }

    ;(window as any).ga(`send`, `event`, trackingEventOptions)
  }
}

interface OutboundLinkProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface CustomEventArgs {
  category: string
  action: string
  label?: string
  value?: string
  nonInteraction?: boolean
  transport?: "beacon" | "xhr" | "image"
  hitCallback?: Function
  callbackTimeout?: number
}

export { OutboundLink, trackCustomEvent }
