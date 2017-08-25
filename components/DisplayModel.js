import React from 'react';

import {
    View,
    Cylinder,
    VrButton,
    Text
} from 'react-vr';

const ROTATION_INCREMENT = 15;

export default class display_model extends React.Component {
    constructor(props) {
        super(props);
        this.state={rotation:0}
    }
    
    render() {
        return (
            <View
                style={this.props.style}
            >
                <View style={{
                        flexDirection:'row'
                    }}
                >
                <VrButton
                    style={{
                        
                        width:0.3,
                        transform: [
                            {translate: [-0.7, 0.4, 0]}
                        ]
                    }}
                    onClick={() => {
                        this.setState({
                            rotation: this.state.rotation - ROTATION_INCREMENT
                        });
                    }
                    }
                >
                    <View>
                    <Text
                        style={{
                            backgroundColor: 'grey',
                            fontSize:0.5,
                            textAlign:'right'
                        }}
                    >&lt;</Text>
                    </View>
                </VrButton>
                <View
                    style={{
                        flexDirection:'row'
                    }}
                >
                    <Cylinder
                        dimHeight={0.5}
                        radiusTop={0.5}
                        radiusBottom={0.6}
                        segments={20}
                        style={{
                            transform: [
                                {translateY:0},
                            ],
                            color:this.props.pedestalColor || "#7c423b"
                        }}
                        lit
                    />
                    <View
                        style={{
                            position:'absolute',
                            transform:[
                                {translateY: 0.75},
                                {rotateY: this.state.rotation}
                            ]
                        }}
                    >
                        {this.props.children}
                    </View>
                </View>
                <VrButton
                    style={{
                        
                        width:0.3,
                        transform: [
                            {translate: [0.7, 0.4, 0]}
                        ]
                    }}
                    onClick={() => {
                        this.setState({
                            rotation: this.state.rotation + ROTATION_INCREMENT
                        });
                    }
                    }
                >
                    <Text
                        style={{
                            position:'absolute',
                            left:'0px',
                            backgroundColor: 'grey',
                            fontSize:0.5,
                            textAlign:'left'
                        }}
                    >&gt;</Text>
                </VrButton>
            </View>
            </View>
            
        )
    }
}