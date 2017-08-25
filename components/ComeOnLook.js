import React from 'react';

import {
    View,
    Animated
} from 'react-vr';

export default class ComeOnLook extends React.Component {
    constructor(props) {
        super(props);
        this.maxDistance = -1*this.props.maxDistance || -5;
        this.state = {
            distance: new Animated.Value(this.maxDistance)
        }
    }
    
    render() {
        
        //clone the children but add props for when they are hovered over
        let children = React.cloneElement(this.props.children, {
            
        })
        
        return (
            <View style={this.props.style}>
                <Animated.View
                    style={{
                        transform:[
                            {translateZ:this.state.distance}
                        ]
                    }}
                    onEnter={
                        ()=>{
                            console.log('enter');
                            Animated.timing(
                                this.state.distance,
                                {
                                    toValue: 0,
                                    duration: 2000
                                }
                            ).start()
                        }
                    }
                    onExit={
                        ()=>{
                            console.log('exit');
                            Animated.timing(
                                this.state.distance,
                                {
                                    toValue:this.maxDistance,
                                    duration: 2000
                                }
                            ).start()
                        }
                    }
                >
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}