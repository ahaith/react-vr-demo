import React from 'react';

import {
    View,
    Plane,
    Cylinder,
    VrButton,
    Text,
    Animated,
} from 'react-vr';

import {Easing} from 'react-native'

const ROTATION_INCREMENT = 30;

export default class display_model extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            rotation: new Animated.Value(0),
            increaseButtonActive: false,
            decreaseButtonActive: false
        }
        this.currentRot = 0;
        //keep track of the value set by the animated rotation
        this.state.rotation.addListener( (val) => {
            this.currentRot = val.value;
        })
    }
    
    onClickRotate(increasing) {
        // console.log('rotate');
        // //increasing is a bool indicating whether the rotation should increase or decrease
        // let anim = Animated.timing(
        //     this.state.rotation,
        //     {
        //         toValue: increasing ? this.currentRot + ROTATION_INCREMENT : this.currentRot - ROTATION_INCREMENT,
        //         duration: 1000
        //     }
        // ).start();
    }
    
    startRotate(increasing, skipEaseIn) {
        if(!this.rotateAnim) {
            console.log('start rotate');
            this.rotateAnim = Animated.timing(
                //perform a 90 deg rotation
                this.state.rotation,
                {
                    toValue: increasing? this.currentRot+90: this.currentRot-90,
                    duration: 2500,
                    // easing: skipEaseIn ? Easing.linear : Easing.in(Easing.ease)
                    easing: skipEaseIn ? Easing.linear : Easing.in(Easing.quad)
                }
            );
            this.rotateAnim.start(
                (result) => {
                    console.log('finished anim result', result);
                    this.rotateAnim = null;
                    if(result.finished) {
                        //anim completed, wasn't stopped, keep rotating
                        this.startRotate(increasing, true)
                    }
                }
            )
        }
    }
    
    stopRotate() {
        console.log('stop rotate');
        if(this.rotateAnim) {
            this.rotateAnim.stop();
        }
    }
    
    render() {
        return (
            <View
                style={this.props.style}
            >
                <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}
                >
                <VrButton
                    style={{
                        height:4,
                        width:0.3,
                        transform: [
                            {translate: [-0.5, 0.4, 0.1]}
                        ]
                    }}
                    onClick={()=>{this.onClickRotate(false)}}
                    onEnter={()=>{
                        this.setState({decreaseButtonActive:true})
                        this.startRotate(false)
                    }}
                    onExit={()=>{
                        this.setState({decreaseButtonActive:false})
                        this.stopRotate(false)
                    }}
                >
                        <Text
                            style={{
                                height:'50%',
                                padding:'10',
                                backgroundColor: this.state.decreaseButtonActive ? 'lightgrey' : 'grey',
                                fontSize:0.5,
                                textAlign:'right'
                            }}
                        >&lt;</Text>
                </VrButton>
                <View
                    style={{
                        flexDirection:'column'
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
                            color: this.props.active ? "#7c423b" : "#2d1714"
                        }}
                        lit
                    />
                    <Plane
                        dimHeight={5}
                        dimWidth={2.5}
                        style={{opacity:0}}
                        position='absolute'
                    />
                    <Animated.View
                        style={{
                            position:'absolute',
                            transform:[
                                {translateY: 0.75},
                                {rotateY: this.state.rotation}
                            ],
                            display:'flex',
                            alignItems:'center',
                            height:3
                        }}
                    >
                        {this.props.children}
                    </Animated.View>
                </View>
                <VrButton
                    style={{
                        height:4,
                        width:0.3,
                        transform: [
                            {translate: [0.4, 0.4, 0.1]}
                        ]
                    }}
                    onClick={()=>{this.onClickRotate(true)}}
                    onEnter={()=>{
                        this.setState({increaseButtonActive:true})
                        this.startRotate(true)
                    }}
                    onExit={()=>{
                        this.setState({increaseButtonActive:false})
                        this.stopRotate(true)
                    }}
                >
                    <Text
                        style={{
                            height:'50%',
                            left:'0px',
                            backgroundColor: this.state.increaseButtonActive ? 'lightgrey' : 'grey',
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