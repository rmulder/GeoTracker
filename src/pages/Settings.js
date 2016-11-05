import React, { Component, PropTypes } from 'react';
import { getSetting, setSetting, mapTileDefs } from '../models/settings';
import PageHeader from '../components/PageHeader';
import MapBackgroundChooser from '../components/MapBackgroundChooser';

class Settings extends Component {
    static propTypes = {
        trackStore: PropTypes.object.isRequired,
    }

    handleChangeGps(e) {
        setSetting('gps.simulatePositions', e.target.checked);
        // @TODO: make setSetting change the state upwards so it rerenders automatically
        this.forceUpdate();
    }

    handleChangeUnit(e) {
        setSetting('lengthUnit', e.target.value);
        this.forceUpdate();
    }

    handleResetDatabase() {
        if (!confirm('This will delete all your tracks. Are you sure?')) { return; }
        this.props.trackStore.clearDatabase(() => {
            alert('Database cleared');
        }, event => {
            alert('Error');
        });
    }

    changeMapTiles(newTilesKey) {
        setSetting('mapTiles', newTilesKey);
        this.forceUpdate();
    }

    render() {
        return <div>
            <PageHeader
                title="Settings"
                backPath="/tracks"
            />
            <main>
                <fieldset>
                    <legend>Display</legend>
                    <div className="padding">
                        <div className="setting">
                            Length units:&nbsp;
                            <label>
                                <input
                                    name="lengthUnit"
                                    value="metric"
                                    type="radio"
                                    checked={getSetting('lengthUnit') === 'metric'}
                                    onChange={e => { this.handleChangeUnit(e); }}
                                />
                                Metric
                            </label>
                            <label>
                                <input
                                    name="lengthUnit"
                                    value="imperial"
                                    type="radio"
                                    checked={getSetting('lengthUnit') === 'imperial'}
                                    onChange={e => { this.handleChangeUnit(e); }}
                                />
                                Imperial
                            </label>
                            <p className="helpMsg">For distances and map scale.</p>
                        </div>
                        <div className="setting">
                            Map background style
                            <MapBackgroundChooser
                                activeMapTiles={getSetting('mapTiles')}
                                mapTiles={mapTileDefs}
                                changeMapTiles={newStyleKey => this.changeMapTiles(newStyleKey)}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Data</legend>
                    <div className="padding">
                        <label>
                            <button onClick={() => { this.handleResetDatabase(); }}>Reset database</button>
                        </label>
                        <p className="helpMsg">Will remove all tracks.</p>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Debugging</legend>
                    <div className="padding">
                        <label>
                            <input
                                type="checkbox"
                                checked={getSetting('gps.simulatePositions')}
                                onChange={e => { this.handleChangeGps(e); }}
                            />
                            Use fake GPS positions
                        </label>
                    </div>
                </fieldset>
            </main>
        </div>;
    }
}

export default Settings;