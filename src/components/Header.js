import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix, Link, toStyleObj} from '../utils';
import Picture from './Picture';

export default class Header extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let site = _.get(this.props, 'site', null);
        let is_white_header = _.get(page, 'frontmatter.white_header', null) || false;
        let is_logo_light = false;
        if ((is_white_header || (_.get(page, 'frontmatter.layout', null) === 'product'))) {
             is_logo_light = true;
        }
        return (
            <React.Fragment>
                <header className="header">
                    <nav className={classNames('nav', {'nav--light': is_white_header, 'nav--dark': is_white_header !== true})}>
                        <div className="nav__logo"{...((is_logo_light && _.get(site, 'data.config.logo_light', null)) ? ({"data-original": withPrefix(_.get(site, 'data.config.logo_light', null))}) : null)}{...(_.get(site, 'data.config.logo_dark', null) ? ({"data-dark": withPrefix(_.get(site, 'data.config.logo_dark', null))}) : null)}>
                            <Link href={withPrefix('/')}>
                                {is_logo_light ? (
                                    <Picture {...this.props} image={_.get(site, 'data.config.logo_light', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                ) : 
                                    <Picture {...this.props} image={_.get(site, 'data.config.logo_dark', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                }
                            </Link>
                        </div>
                        <ul className="nav__menu">
                            {_.map(_.get(site, 'data.config.main_menu', null), (item, item_idx) => {
                                let section = _.get(page, 'frontmatter.section', null) || _.get(page, 'frontmatter.title', null);
                                let isActive = (_.get(item, 'title', null) === section) ? (true) : false;
                                return (<React.Fragment key={item_idx + '.1'}>
                                    <li key={item_idx} className="nav__menu-item">
                                        <Link href={withPrefix(_.get(item, 'url', null))} className={classNames('nav__menu-item-link', {'nav__menu-item-link--active': isActive})}>
                                            {_.get(item, 'title', null)}
                                        </Link>
                                    </li>
                                </React.Fragment>)
                            })}
                        </ul>

                        </div>
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}
