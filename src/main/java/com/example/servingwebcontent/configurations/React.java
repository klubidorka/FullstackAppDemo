package com.example.servingwebcontent.configurations;

import jdk.nashorn.api.scripting.NashornScriptEngine;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import java.io.IOException;


@Component
public class React {

    @Value(value = "classpath:dist/bundle.js")
    private Resource bundleJsFile;

    private NashornScriptEngine getNashornScriptEngine() throws ScriptException, IOException {

        NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName ("nashorn");

        nashornScriptEngine.eval ("load ('" + bundleJsFile.getURL() + "')");

        return nashornScriptEngine;
    }
}
