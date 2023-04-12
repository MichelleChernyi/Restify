import React from 'react'

class HostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            filter: '',
            curr_prop_id: '',
            create: false,
        });
        console.log(this.state)
    }

    render() {
        return (
            <main id="#host-main">
                <div id="#left-sidebar">
                    <h2>Properties</h2>
                    {/* <h4>{this.state.create}</h4> */}
                    <button onClick={this.setState({create: true})}>Add New Property</button>
                </div>
                <div id="#property-wrapper">

                </div>
            </main>
        );
    }
}
export default HostIndex;