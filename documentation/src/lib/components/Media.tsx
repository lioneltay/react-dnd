import React from "react"

type QueryProp = string | Record<string, string>
type Matches<Q extends QueryProp> = Q extends string
  ? boolean
  : { [K in keyof Q]: boolean }

interface ChildProps<Q extends QueryProp> {
  matches: Matches<Q>
}

interface Props<Q extends QueryProp> {
  children: ((props: ChildProps<Q>) => React.ReactNode)
  query: Q
}

type State = Readonly<{
  matches: Record<string, boolean>
  mounted: boolean
}>

type MQLInfo = {
  mql: MediaQueryList
  handler: (mql: { matches: boolean }) => void
}

const DEFAULT = "@@default_media_query@@"

export class Media<Q extends QueryProp> extends React.Component<
  Props<Q>,
  State
> {
  mqls: Map<string, MQLInfo> = new Map()

  state: State = {
    matches: {},
    mounted: false,
  }

  componentDidMount() {
    const { query } = this.props
    const queries = (typeof query === "string"
      ? { [DEFAULT]: query }
      : query) as Record<string, string>

    Object.keys(queries).forEach(key => {
      const mql = window.matchMedia(queries[key])
      const handler = ({ matches }: { matches: boolean }) =>
        this.setState(state => ({
          matches: {
            ...state.matches,
            [key]: matches,
          },
        }))

      mql.addListener(handler)
      handler(mql)

      this.mqls.set(key, { mql, handler })
    })

    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    this.mqls.forEach(info => info.mql.removeListener(info.handler as any))
  }

  render() {
    return !this.state.mounted
      ? null
      : this.props.children({
          matches: (typeof this.props.query === "string"
            ? this.state.matches[DEFAULT]
            : this.state.matches) as Matches<Q>,
        })
  }
}
