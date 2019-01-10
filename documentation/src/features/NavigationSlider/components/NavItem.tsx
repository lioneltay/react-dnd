import React from "react"
import styled from "styled-components"
import { NavLink, Route } from "react-router-dom"
import { NavHashLink } from "react-router-hash-link"

const NavItem = styled(NavHashLink).attrs(({ theme }) => ({
  activeStyle: {
    color: theme.colors.primary,
  },
}))`
  display: block;
  color: black;
  text-decoration: none;
  margin: 10px 0;
  font-size: 18px;
  font-weight: 300;
`

export default NavItem