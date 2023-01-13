const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

async function test_case(){

                    
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();

    await driver.get("https://nordcheckout.com/products");

    await driver.manage().setTimeouts({
        implicit: 1000});


    await driver.findElement(By.xpath("//span[text()='NordVPN']//ancestor :: a[contains(@href,'/?product_group=nordvpn')]")).click();

    await driver.findElement(By.xpath("//a[@data-testid='UserProfile-login-button']")).click(); 

    await driver.navigate().back();


    console.log(await driver.getCurrentUrl());

    if(await driver.getCurrentUrl() === "login") {
        console.log("Passed");
    
    }
    else{
        console.log("Failed");
        return;
    }

   
    await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/preceding :: div[1])")).click();

    await driver.findElement(By.xpath("//a[text()='Continue to payment']")).click();
    var expectedCurrencyMonthly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[@data-testid='MainPlanCard-atomic-price']/span[@data-testid='TPrice-currency']")).getText();
    var expectedAmountMonthly=  await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[@data-testid='MainPlanCard-atomic-price']/span[@data-testid='TPrice-integer']")).getText();
    var expectedDecimalMonthly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[@data-testid='MainPlanCard-atomic-price']/span[@data-testid='TPrice-decimal']")).getText();
    var expectedAmount2Monthly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[@data-testid='MainPlanCard-atomic-price']/span[@data-testid='TPrice-fraction']")).getText();
    var expectedMonthyPlan= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[@data-testid='MainPlanCard-atomic-price']/span[5]")).getText();
    var expectedMonthlyPay= expectedCurrencyMonthly+expectedAmountMonthly+expectedDecimalMonthly+expectedAmount2Monthly+expectedMonthyPlan;


    var expectedCurrencyYearly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[2]/descendant ::span[@data-testid='TotalBilledText-total-price']/span[1]")).getText();
    var expectedAmountYearly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[2]/descendant ::span[@data-testid='TotalBilledText-total-price']/span[2]")).getText();
    var expectedDecimalYearly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[2]/descendant ::span[@data-testid='TotalBilledText-total-price']/span[3]")).getText();
    var expectedAmount2Yearly= await driver.findElement(By.xpath("//div[@data-testid='MainPlanCard-period' and contains(.,'1-year plan')]/parent :: div/following-sibling :: div[2]/descendant ::span[@data-testid='TotalBilledText-total-price']/span[4]")).getText();
    var expectedYearlyPay= expectedCurrencyYearly+expectedAmountYearly+expectedDecimalYearly+expectedAmount2Yearly;


    var actualCurrencyMonthly= await driver.findElement(By.xpath("//span[@data-testid='SelectedCartSummaryCard-atomic-price']/span[1]")).getText();
    var actualAmountMonthly= await driver.findElement(By.xpath("//span[@data-testid='SelectedCartSummaryCard-atomic-price']/span[2]")).getText();
    var actualDecimalMonthly= await driver.findElement(By.xpath("//span[@data-testid='SelectedCartSummaryCard-atomic-price']/span[3]")).getText();
    var actualAmount2Monthly= await driver.findElement(By.xpath("//span[@data-testid='SelectedCartSummaryCard-atomic-price']/span[4]")).getText();
    var actualMonthyPlan= await driver.findElement(By.xpath("//span[@data-testid='SelectedCartSummaryCard-atomic-price']")).getText();
    var actualMonthlyPay= actualCurrencyMonthly+actualAmountMonthly+actualDecimalMonthly+actualAmount2Monthly+actualMonthyPlan;


    var actualCurrencyYearly= await driver.findElement(By.xpath("//div[@data-testid='SelectedCartSummaryCard-total-price']/span[1]")).getText();
    var actualAmountYearly= await driver.findElement(By.xpath("//div[@data-testid='SelectedCartSummaryCard-total-price']/span[2]")).getText();
    var actualDecimalYearly= await driver.findElement(By.xpath("//div[@data-testid='SelectedCartSummaryCard-total-price']/span[3]")).getText();
    var actualAmount2Yearly= await driver.findElement(By.xpath("//div[@data-testid='SelectedCartSummaryCard-total-price']/span[4]")).getText();
    var actualYearlyPay= expectedCurrencyYearly+expectedAmountYearly+expectedDecimalYearly+expectedAmount2Yearly;

    assert.strictEqual(actualMonthlyPay, expectedMonthlyPay);
        console.log('Actual and Expected monthy pay is same:',actualMonthlyPay === expectedMonthlyPay);

        assert.strictEqual(actualYearlyPay, expectedYearlyPay);
        console.log('Actual and Expected yearly pay is same:',actualYearlyPay === expectedYearlyPay);

        await driver.quit();

}

test_case();