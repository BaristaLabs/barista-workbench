
import * as React from 'react';
import { observer } from 'mobx-react';
import { SplitPane } from '../SplitPane';

@observer
export class Fiddle extends React.Component<FiddleProps, FiddleState> {

    public constructor(props: FiddleProps) {
        super(props);

        this.state = {
            fiddlePaneSize: '50%'
        };
    }

    public render() {
        return (
            <SplitPane
                split="vertical"
                className="fiddle"
                primaryPaneSize={this.state.fiddlePaneSize}
                primaryPaneMinSize={0}
                secondaryPaneStyle={{ overflow: 'auto' }}
                onPaneResized={(newSize: number) => { this.setState({ fiddlePaneSize: `${newSize}px` }); }}
                onResizerDoubleClick={() => { this.setState({ fiddlePaneSize: '50%' }); }}
                onWindowResize={() => { this.setState({ fiddlePaneSize: '50%' }); }}
            >
                <div>Hello</div>
                <div>World</div>
            </SplitPane>
        );
    }
}

export interface FiddleState {
    fiddlePaneSize: string;
}

export interface FiddleProps {
}