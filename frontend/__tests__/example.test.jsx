import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import Product from "../src/components/Product"
import store from "../src/store"

describe("Hello", () => {
  it("works!", () => {
    render(
      <Provider store={store}>
        <Product product={{}} />
      </Provider>
    )
    expect(true).toBeTruthy()
  })
})
