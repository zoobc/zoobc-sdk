const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer" style={{ background: '#0b3d65 !important' }}>
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Products</h5>
            <a href={this.docUrl('doc1.html', this.props.language)}>ZooBC Core</a>
            <a href={this.docUrl('doc2.html', this.props.language)}>ZooBC Wallet</a>
            <a href={this.docUrl('doc3.html', this.props.language)}>ZooBC Explorer</a>
            <a href={this.docUrl('doc3.html', this.props.language)}>White Paper</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>Getting Started</a>
            <a href="#">Developer APIs</a>
            <a href="#">Research</a>
            <a href="#">Roadmap</a>
          </div>
          <div>
            <h5>Company</h5>
            <a href={`${this.props.config.baseUrl}blog`}>About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
