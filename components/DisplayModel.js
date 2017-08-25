import React from 'react';

import {
    View,
    Cylinder,
    VrButton,
    Text,
    Animated
} from 'react-vr';

const ROTATION_INCREMENT = 30;

export default class display_model extends React.Component {
    constructor(props) {
        super(props);
        this.state={rotation: new Animated.Value(0)}
        this.currentRot = 0;
        //keep track of the value set by the animated rotation
        this.state.rotation.addListener( (val) => {
            this.currentRot = val.value;
            console.log('rotation changed:', val);
        })
    }
    
    onClickRotate(increasing) {
        //increasing is a bool indicating whether the rotation should increase or decrease
        let anim = Animated.timing(
            this.state.rotation,
            {
                toValue: increasing ? this.currentRot + ROTATION_INCREMENT : this.currentRot - ROTATION_INCREMENT,
                duration: 1000
            }
        ).start();
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
                    onClick={()=>{this.onClickRotate(false)}}
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
                    <Animated.View
                        style={{
                            position:'absolute',
                            transform:[
                                {translateY: 0.75},
                                {rotateY: this.state.rotation}
                            ]
                        }}
                    >
                        {this.props.children}
                    </Animated.View>
                </View>
                <VrButton
                    style={{
                        
                        width:0.3,
                        transform: [
                            {translate: [0.7, 0.4, 0]}
                        ]
                    }}
                    onClick={()=>{this.onClickRotate(true)}}
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