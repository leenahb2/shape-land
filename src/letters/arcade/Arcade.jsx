import React from 'react';
import BalloonPop from './games/BalloonPop';
import RocketMoon from './games/RocketMoon';
import MysteryEggs from './games/MysteryEggs';
import Collector from '../interactive/Collector';
import Tracing from '../interactive/Tracing.jsx';
import './arcade.css';
const COMPONENTS={balloons:BalloonPop,rocket:RocketMoon,eggs:MysteryEggs,collector:Collector,tracing:Tracing};
export default function Arcade({type,...props}){const Game=COMPONENTS[type];return <Game {...props}/>;}
