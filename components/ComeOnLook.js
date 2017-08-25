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
    
    approach() {
        if(this.retreatAnim) {
            this.retreatAnim.stop();
        }
        if(!this.approachAnim) {
            console.log('enter');
            this.approachAnim = Animated.timing(
                this.state.distance,
                {
                    toValue: -1.5,
                    duration: 2000
                }
            );
            this.approachAnim.start(()=>{this.approachAnim=null;})
        }
    }
    
    retreat() {
        this.retreatAnim = Animated.sequence([
            Animated.delay(1000),
            Animated.timing(
            this.state.distance,
            {
                toValue:this.maxDistance,
                duration: 2000
            }
        )]);
        
        this.retreatAnim.start(() => {this.retreatAnim=null;})
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
                        ],
                        position:'absolute'
                    }}
                    onMove={this.approach.bind(this)}
                    onEnter={this.approach.bind(this)}
                    onExit={this.retreat.bind(this)}
                >
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}