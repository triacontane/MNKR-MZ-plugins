/*
 * --------------------------------------------------
 * MNKR_EncounterEffect Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EncounterEffect.js
 * @plugindesc エンカウント時の演出を調整できます。
 * @author munokura
 *
 * @param Zoom Process
 * @text ズーム処理？
 * @type boolean
 * @on ズームする
 * @off ズームしない
 * @desc エンカウント時に戦闘前のズーム演出
 * ツクールデフォルト：する
 * @default false
 * 
 * @param Flash Process
 * @text フラッシュ処理？
 * @type boolean
 * @on フラッシュする
 * @off フラッシュしない
 * @desc エンカウント時に戦闘前のフラッシュ演出
 * ツクールデフォルト：する
 * @default false
 * 
 * @help
 * エンカウント時の演出を調整できます。
 * プラグインパラメーターで設定してください。
 * 
 * プラグインコマンドはありません。
 *
 * 利用規約
 * MITライセンスです。
 * http://opensource.org/licenses/mit-license.php
 */

const parameters = PluginManager.parameters('MNKR_EncounterEffect');
const zoomProcess = eval(parameters['Zoom Process'] || 'false');
const flashProcess = eval(parameters['Flash Process'] || 'false');

(function () {
    'use strict'

    Scene_Map.prototype.updateEncounterEffect = function () {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const p = n / speed;
            const q = ((p - 1) * 20 * p + 5) * p + 1;
            const zoomX = $gamePlayer.screenX();
            const zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                if (flashProcess) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            if (zoomProcess) {
                $gameScreen.setZoom(zoomX, zoomY, q);
            }
            if (n === Math.floor(speed / 6)) {
                if (flashProcess) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };

})()