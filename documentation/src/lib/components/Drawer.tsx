import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;

  position: fixed;

  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;
`

const DrawerContainer = styled.div`
  height: 100vh;
  left: 0;
  top: 0;
  background: white;
  transition: transform 225ms;
`

const Space = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100vh;
  top: 0;
  left: 0;

  cursor: pointer;
`

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 225ms;
`

const Cross = styled.i`
  font-size: 28px;
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
`

export type Props = {
  style?: React.CSSProperties
  className?: string
  open: boolean
  onClose?: () => void
  onTransitionEnd?: () => void
}

type State = {
  // Just to put the whole container below all other content when the drawer is not open so that dev tools doesn't get blocked when trying to select an element.
  above: boolean
}

export default class Drawer extends React.Component<Props, State> {
  state: State = {
    above: false,
  }

  toggleZIndex = () => {
    this.setState({ above: this.props.open })
  }

  render() {
    return (
      <Container
        style={{ zIndex: this.props.open || this.state.above ? 1000 : -1 }}
      >
        <Overlay
          style={{
            opacity: this.props.open ? 1 : 0,
            pointerEvents: this.props.open ? "all" : "none",
          }}
        >
          <Cross className="fas fa-times" />
        </Overlay>

        <DrawerContainer
          onTransitionEnd={() => {
            this.toggleZIndex()
            this.props.onTransitionEnd && this.props.onTransitionEnd()
          }}
          className={this.props.className}
          style={{
            ...this.props.style,
            transform: `translateX(${this.props.open ? "0" : "-100%"})`,
          }}
        >
          <div>{this.props.children}</div>
        </DrawerContainer>

        <Space
          style={{
            opacity: this.props.open ? 1 : 0,
            pointerEvents: this.props.open ? "all" : "none",
          }}
          onClick={this.props.onClose}
        >
          <Cross className="fas fa-times" />
        </Space>
      </Container>
    )
  }
}
