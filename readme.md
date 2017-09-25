
# How much is your Alternative Minimum Tax?

If you exercise Incentive Stock Options ("ISOs"), you may be subject to Alternative Minimum Tax ("AMT"). AMT is a parallel tax system imposed on an alternative, more comprehensive measure of income, which includes the unrealized gains of ISO value, with fewer opportunities for deductions. If the calculated AMT exceeds the ordinary income tax, then the AMT amount is used.

*Note that this is an oversimplified estimate that focuses exclusively on ISOs and their impact on AMT. This is not legal or tax advice. For assistance with your specific situation, please consult a tax lawyer.*

## Calculating AMT

We first start with the adjusted gross income. For the purposes of this back-of-the-envelope estimation, we use the annual gross salary. However, there are many other adjustments that influence this number. Learn more about [determining the adjusted gross income](http://www.investopedia.com/financial-edge/0312/how-to-calculate-agi-for-tax-purposes.aspx).

To get to the alternative minimum taxable income ("AMTI"), there are many income adjustments applied to the adjusted gross income. This site only considers the value of ISOs when exercised (the fair market value less the strike price). However, [there are many other types of deductions subject to AMT](https://turbotax.intuit.com/tax-tools/tax-tips/IRS-Tax-Return/Alternative-Minimum-Tax--Common-Questions/INF12072.html).

To calculate the AMT base, we take AMTI and less the AMT exemptions. The actual exemption amount depends on the filing status and total AMTI. Here is the table for determining the exemption amounts for 2016.

```
  | Filing Status             | Amount | Phase Out |
  | ------------------------- | ------ | --------- |
  | Single                    | 53,900 | 119,700   |
  | Married                   | 83,800 | 159,700   |
  | Married Filing Separately | 41,900 | 79,850    |
```

To prevent upper-income taxpayers from benefiting from the exemption, it "phases out" as AMTI increases. For every $1 beyond the phase out amount, the exemption amount is reduced by $0.25. For example, a single person who has AMTI of $150,000 will only have 53,900 – ((150,000 – 119,700) x 0.25) = 23,600 of exemptions. [Learn more about calculating AMT exemptions](http://amtadvisor.com/AMT_Exemption.html).

We calculate the tentative minimum tax by applying the AMT rate (either 26% or 28%, depending on the amount) to the AMT base. For 2016, the threshold where the 26 percent AMT tax bracket ends and the 28 percent AMT tax bracket begins is $93,150 for married filing separately and $186,300 for all other filing statuses

Finally, we compare the tentative minimum tax to the ordinary income tax. Ordinary income tax is calculated based on a varying rates associated with the income, as well as the filing status (the table for 2016 is below). The ultimate payable tax will be the greater of either the tentative minimum tax or the ordinary income tax.

Here is the table for ordinary income tax brackets.

```
  | Rate  | Single  | Married | Married, Filing Separately |
  | ----- | ------- | ------- | -------------------------- |
  | 10%   | 0       | 0       | 0                          |
  | 15%   | 9,275   | 13,250  | 9,275                      |
  | 25%   | 37,650  | 50,400  | 37,650                     |
  | 28%   | 91,150  | 130,150 | 75,950                     |
  | 33%   | 190,150 | 210,800 | 115,725                    |
  | 35%   | 413,350 | 413,350 | 206,675                    |
  | 39.6% | 415,050 | 441,000 | 233,475                    |
```

The rate on the left applies to income from that row to the one beneath it. For instance, a single person with $150,000 in income will pay 10% on the first $9,275, 15% on the next $28,375, 25% on the next $53,500, and 28% on the remaining $58,850.

## Additional Reading

- [What Exactly Is The Alternative Minimum Tax (AMT)? (Forbes)](https://www.forbes.com/sites/kellyphillipserb/2017/03/15/what-exactly-is-the-alternative-minimum-tax-amt/#796f48993dc9)
- [Alternative Minimum Tax (AMT) for Individuals (This Matter)](http://thismatter.com/money/tax/alternative-minimum-tax.htm)
- [How Does the Alternative Minimum Tax Work? (Nerdwallet)](https://www.nerdwallet.com/blog/taxes/alternative-minimum-tax-amt/)
- [Alternative Minimum Tax: Common Questions (Turbotax)](https://turbotax.intuit.com/tax-tools/tax-tips/IRS-Tax-Return/Alternative-Minimum-Tax--Common-Questions/INF12072.html)
- [Stock Options and the Alternative Minimum Tax (AMT) (NCEO)](https://www.nceo.org/articles/stock-options-alternative-minimum-tax-amt)
- [What’s your AGI? (CNN Money)](http://money.cnn.com/tmp/networth2.html)
- [How To Calculate AGI For Tax Purposes (Investopedia)](http://www.investopedia.com/financial-edge/0312/how-to-calculate-agi-for-tax-purposes.aspx)
- [The AMT Exemption (AMT Advisor)](http://amtadvisor.com/AMT_Exemption.html)
- [Federal Income Tax Rates for the Year 2016 (The Balance)](https://www.thebalance.com/federal-income-tax-rates-for-the-year-2016-3193200)

## License

MIT.

