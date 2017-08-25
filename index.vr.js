import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Cylinder,
  AmbientLight,
  SpotLight
} from 'react-vr';

import DisplayModel from './components/DisplayModel'

export default class vr_test extends React.Component {
  render() {
    return (
      <View
      >
        <Pano source={asset('interior.jpg')}/>
        <DisplayModel
            style={{transform: [
                {translate:[0, -1, -2.5]}
                
            ]}}
        >
            <Model
                source={{
                    obj: asset('Reliquary_OBJ_lower_smooth.obj')
                }}
                lit
                style={{
                    transform: [
                        {scale: 0.2},
                        {rotateY:180}
                    ]
                }}
                texture={asset('Reliquary OBJ.jpg')}
            />
        </DisplayModel>
        <SpotLight
            style={{
                transform: [
                    {translate: [1, 3, -2]}
                ]
            }}
        />
        
        <AmbientLight
            intensity={0.5}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_test', () => vr_test);
