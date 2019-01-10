import React, { Fragment, useContext } from "react"
import styled from "styled-components"
import { StoreContext } from "store"
import { Link } from "react-router-dom"
import { Media } from "lib/components"

export const HEADER_HEIGHT = 60

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`

const Spacer = styled.div`
  height: ${HEADER_HEIGHT}px;
`

const Logo = styled.div`
  color: inherit;
  text-align: center;
  padding: 15px;
  font-size: 28px;
  font-weight: 500;

  & > a {
    color: inherit;
    text-decoration: none;
  }
`

const Items = styled.div`
  display: flex;
  align-items: center;

  & a {
    margin: 15px;
    font-size: 20px;
    font-weight: 300;
    color: inherit;
    text-decoration: none;
  }
`

const Header: React.FunctionComponent = () => {
  const {
    actions: { setNavigationOpen },
  } = useContext(StoreContext)

  return (
    <Fragment>
      <Spacer />

      <Container>
        <Logo>
          <Media query="(min-width: 1100px)">
            {({ matches }) =>
              !matches && (
                <i
                  className="fas fa-bars"
                  style={{ marginRight: 20, cursor: "pointer" }}
                  onClick={() => setNavigationOpen(true)}
                />
              )
            }
          </Media>
          <Link to="/">@tekktekk/react-dnd</Link>
        </Logo>

        <Items>
          <Link to="/guides">Guides</Link>
          <Link to="/api">API</Link>
          <Link to="/examples">Examples</Link>
          <a href="https://github.com/lioneltay/react-dnd">Github</a>
        </Items>
      </Container>
    </Fragment>
  )
}

export default Header
