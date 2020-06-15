import React, { Component } from 'react'

export default class check extends Component {
    constructor(props)
    {
    super(props)
    console.log('c constructor')


    }
    componentDidMount()
   
    {
        console.log('c didmount')

    }
    componentWillReceiveProps(prop)
   
    {
        console.log('c props')

    }
   componentWillMount()
   {
     console.log('c willmount')

   }

    render() {
        console.log('c render')
        return (
            <div>
                laskllksalklska
            </div>
        )
    }
}
